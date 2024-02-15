import { ChatOpenAI } from "@langchain/openai"
import { Request, Response, NextFunction } from "express"
import { ConversationSummaryBufferMemory } from "langchain/memory";
import {User, ConversationPair, Chat, Thread} from "../model/User.js"
import { ConversationChain } from "langchain/chains";
import { rmSync } from "fs";

type chat = {
    _id?: String,
    chatPair: [String, String]
} 

// pass in prompt + thread id
export const generateAIResponse = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const llm = new ChatOpenAI({})
        const  { prompt, threadId }: { prompt: String, threadId: String } = req.body
        const user = await User.findOne({username: res.locals.user.username })
        const thread = user.threads.find(thread => thread._id.toString() == threadId)
        
        // get all user's chats to store in conversation summary buffer
        const memory = new ConversationSummaryBufferMemory({
            llm: llm,
            maxTokenLimit: 100,
            aiPrefix: "AI Assistant"
        })

        // TODO: take into account when chats array is null
        
        for (const {user:userChats, system:systemChats} of thread.conversationPairs) {
            memory.saveContext({input: userChats.content}, {output: systemChats.content})
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

        return res.status(201).send(ai_response)
    } catch (e) {
        return res.status(401).send(e.message)
    }
    
}

// get all chats
export const getUserChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chats = await getSortedUserChats(res.locals.user.username)
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


// helpers
const getSortedUserChats = async (username: String) => {
    try {
        // TODO: make this a method in schema, use aggregate instead
        const sortedChats = await User.aggregate([
            { $match: { username } }, // Match the user by username
            { $unwind: "$threads" }, // Deconstruct the threads array
            { $unwind: "$threads.conversationPairs" }, // Deconstruct the conversationPairs array within each thread
            { $sort: { "threads.conversationPairs.updatedAt": -1 } }, // Sort conversationPairs by updatedAt field in descending order
            {
                $group: {
                    _id: "$_id",
                    threads: { $push: "$threads" } // Push the sorted threads back into an array
                }
            }, {
                $project: {
                    _id: 0,
                }
            }
        ]);
        

        return sortedChats[0].threads
    } catch (e) {
        return e.message // TODO: figure out what to do here
    }
}
