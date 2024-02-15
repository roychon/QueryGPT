import { ChatOpenAI } from "@langchain/openai"
import { Request, Response, NextFunction } from "express"
import { ConversationSummaryBufferMemory } from "langchain/memory";
import {User, ConversationPair, Chat} from "../model/User.js"
import { ConversationChain } from "langchain/chains";
import { rmSync } from "fs";

type chat = {
    _id?: String,
    chatPair: [String, String]
} 


export const generateAIResponse = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const llm = new ChatOpenAI({})
        const  { prompt }: { prompt: String } = req.body
        const user = await User.findOne({username: res.locals.user.username})
        
        // get all user's chats to store in conversation summary buffer
        const memory = new ConversationSummaryBufferMemory({
            llm: llm,
            maxTokenLimit: 100,
            aiPrefix: "AI Assistant"
        })

        // TODO: take into account when chats array is null
        
        for (const {user:userChats, system:systemChats} of user.chats) {
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

        user.chats.push(userChat)
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

// edit a conversation pair


// helpers
const getSortedUserChats = async (username: String) => {
    try {
        // TODO: make this a method in schema, use aggregate instead
        const sortedChats = await User.aggregate([
            { $match: { username } }, // Match the user by username
            { $unwind: "$chats" }, // Deconstruct the chats array
            { $sort: { "chats.updatedAt": -1 } }, // Sort chats by updatedAt field in descending order
            { $group: { _id: "$_id", chats: { $push: "$chats" } } } // Group the chats back into an array
        ]);
        
        console.log(sortedChats);
        

        return sortedChats
    } catch (e) {
        return e.message // TODO: figure out what to do here
    }
}
