import { ChatOpenAI } from "@langchain/openai"
import { Request, Response, NextFunction } from "express"
import { ConversationSummaryBufferMemory } from "langchain/memory"
import {User, ConversationPair, Chat, Thread} from "../model/User.js"
import { ConversationChain } from "langchain/chains"
import mongoose from "mongoose"
// const { ImageAnnotatorClient } = require('@google-cloud/vision');
import { rmSync } from "fs";

type chat = {
    _id?: String,
    chatPair: [String, String]
} 

// pass in prompt + thread id
export const generateAIResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prompt, threadId } = req.body
        const {username} = res.locals.user
        const {response, conversationPairId} = await getAIResponse(username, prompt, threadId)
        return res.status(201).json({response,conversationPairId, message: "ok"})
    } catch (e) {
        return res.status(401).send(e.message)
    }  
}

// create new chat thread
export const createNewThread = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body
        const user = await User.findOne({username: res.locals.user.username})
        if (!user) return res.status(401).send("User not registered")
        const thread = new Thread({title})
        user.threads.push(thread)
        await user.save()
        return res.status(201).json({thread})
    } catch (e) {
        throw new Error(e)
    }
}

// get all chats
export const getUserChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chats = await getSortedUserChats(res.locals.user.username, req.body.threadId)
        return res.status(201).json(chats)
    } catch (e) {
        return res.status(401).send(e.message)
    }
}

// rename thread
export const renameThread = async (req: Request, res: Response, next: NextFunction) => {
    const { title, threadId } = req.body
    try {
        // TODO: create a function to get thread by specific threadId (which is ObjectId)
        const user = await User.findOne({username: res.locals.user.username})
        const thread = user.threads.find(thread => thread._id.toString() == threadId)
        thread.title=  title
        await user.save()
        return res.status(201).send("successfully renamed thread title")
    } catch (e) {
        return res.status(401).send(e.message)
    }
}

// delete a thread
export const deleteThread = async (req: Request, res: Response, next: NextFunction) => {
    const { threadId } = req.body
    try {
        // TODO: create a function to get thread by specific threadId (which is ObjectId)
        const user = await User.findOne({username: res.locals.user.username})
        user.threads.filter(thread => thread._id.toString() !== threadId)
        await user.save()
        return res.status(201).send(`successfully deleted thread ${threadId}`)
    } catch (e) {
        return res.status(401).send(e.message)
    }
}

// add a thread
export const addThread = async (req: Request, res: Response, next: NextFunction) => {
    const { threadId } = req.body
    try {
        const user = await User.findOne({username: res.locals.user.username}) // TODO: makes this a method in model
        const newThread = new Thread()
        user.threads.push(newThread)
        await user.save()
        return res.status(201).send("successfully added new thread")
    } catch (e) {
        return res.status(401).send(e.message)
    }
}


// export const getUserThreads = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await User.findOne({ username: res.locals.user.username });
//         if (!user) return res.status(400).send("User is not registered");

//         // Extract thread IDs and titles from user's threads
//         const threads = user.threads.map(thread => ({ id: thread._id, title: thread.title }));

//         return res.status(201).json({ threads });

//     } catch (e) {
//         return res.status(401).send(e.message);
//     }
// };

export const getUserThreads = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.aggregate([
            { $match: { username: res.locals.user.username } }, // Match the user by username
            { $unwind: "$threads" }, // Deconstruct the threads array
            { $sort: { "threads.updatedAt": -1 } }, // Sort threads by updatedAt field in descending order
            { $group: { _id: "$_id", threads: { $push: { _id: "$threads._id", title: "$threads.title" } } } } // Group the threads back into an array
        ]);

        if (!user || !user[0]) {
            return res.status(400).send("User is not registered");
        }

        return res.status(200).json({ threads: user[0].threads });

    } catch (e) {
        return res.status(500).send(e.message);
    }
};


// TODO: move below helpers to a separate 'helpers' folder

// get sorted chats by updatedAt date from a specific thread
const getSortedUserChats = async (username: String, threadId: string) => {
    try {
        // TODO: make this a method in schema, use aggregate instead
        const sortedChats = await User.aggregate([
            { $match: { username } }, // Match the user by username
            { $unwind: "$threads" }, // Deconstruct the threads array
            { $match: { "threads._id": new mongoose.Types.ObjectId(threadId) } }, // Match the thread by threadId
            { $unwind: "$threads.conversationPairs" }, // Deconstruct the conversationPairs array within each thread
            { $sort: { "threads.conversationPairs.updatedAt": 1 } }, // Sort conversationPairs by updatedAt field in descending order
            {
                $group: {
                    _id: "$_id",
                    threads: { $push: {
                        _id: "$threads.conversationPairs._id",
                        user: {
                            content: "$threads.conversationPairs.user.content",
                            role: "$threads.conversationPairs.user.role"
                        },
                        system: {
                            content: "$threads.conversationPairs.system.content",
                            role: "$threads.conversationPairs.system.role"
                        }
                    }  } // Push the sorted threads back into an array
                }
            }, 
            {
                $project: {
                    _id: 0,
                }
            }
        ]);

        return sortedChats[0]?.threads
        // return sortedChats
    } catch (e) {
        return e.message // TODO: figure out what to do here
    }
}


const getAIResponse = async (username: String, prompt: String, threadId: String) => {
    try {
        const llm = new ChatOpenAI({})
        const user = await User.findOne({username: username })
        const thread = user.threads.find(thread => thread._id.toString() == threadId)
        

        // get all user's chats to store in conversation summary buffer
        const memory = new ConversationSummaryBufferMemory({
            llm: llm,
            maxTokenLimit: 1000,
            aiPrefix: "AI Assistant"
        })

        // TODO: take into account when chats array is null
        if (thread.conversationPairs.length > 0) {
            for (const {user:userChats, system:systemChats} of thread.conversationPairs) {
                memory.saveContext({input: userChats.content}, {output: systemChats.content})
            }
        }

        
        // Initialize the conversation chain with the model, memory, and prompt
        const chain = new ConversationChain({
            llm: llm,
            memory: memory,
            // verbose: false
        });

        const ai_response = await chain.invoke({input: prompt})
        
        const userChat = new ConversationPair({
            user: new Chat({
                content: prompt,
                role: "User"
            }),
            system: new Chat({
                content: ai_response.response,
                role: "System"
            })
        })

        thread.conversationPairs.push(userChat)
        await user.save()


        return {response: ai_response, conversationPairId: userChat._id.toString()}
    } catch (e) {
        throw new Error(e)
    }
}
