import { ChatOpenAI } from "@langchain/openai"
import { Request, Response, NextFunction } from "express"
import { ConversationSummaryBufferMemory } from "langchain/memory";
import {User, Chat} from "../model/User.js"
import { ConversationChain } from "langchain/chains";

type chat = {
    _id?: String,
    chatPair: [String, String]
} 

// TODO: make finding all the user chats a separate function, less duplication of code
export const getUserChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userChats = await getAllUserChats(res.locals.user.username)
        return res.status(201).json(userChats)
    } catch (e) {
        return res.status(400).send(e.message)
    }
}

// POST req
export const generateAIResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prompt } = req.body

        const ai_response = await getAIResponse(res.locals.user.username, prompt)
        // console.log(ai_response)
        
        // TODO: make this a method in schema
        const user = await User.findOne({
            username: res.locals.user.username
        })
        if (!user) return res.status(401).send("Please log in") // TODO: test this
        
        const newUserChat = new Chat({
            content: prompt,
            role: "User"
        })

        user.chats.push(newUserChat)
        await user.save()
        
        const newUser = await User.findOne({username: res.locals.user.username})
        const chatId = newUser.chats.slice(-1)[0].chatId
        const newAIChat = new Chat({
            content: ai_response.response,
            role: "System",
            chatId: chatId
        })

        user.chats.push(newAIChat)
        await user.save()
        return res.status(201).send("success")
    } catch (e) {
        return res.status(401).send
    }

}

// helpers
const getAIResponse = async (username: String, prompt: String) => {
    const llm = new ChatOpenAI({})
    // TODO: index this or find a way to store this for efficiency
    const userChats = await getAllUserChats(username)
    // create a conversational chatbot:
    const memory = new ConversationSummaryBufferMemory({
        llm: llm,
        maxTokenLimit: 100,
        aiPrefix: "AI Assistant"
    })

    for (const {chatPair} of userChats) {
        await memory.saveContext({ input: chatPair[0]}, { output: chatPair[1]})
    }

    // const history = await memory.loadMemoryVariables()
    
    // Initialize the conversation chain with the model, memory, and prompt
    const chain = new ConversationChain({
        llm: llm,
        memory: memory,
        // verbose: false
    });

    const ai_response = await chain.invoke({input: prompt})
    return ai_response
}

const getAllUserChats = async (username: String) => {
    const userChats = await User.aggregate([
        {
            $match: { "username": username }
        },
        {
            $unwind: "$chats" // treat each element in the chats array as singularly
        },
        {
            $group: {
                _id: "$chats.chatId",
                chatPair: {
                    $push: "$chats.content"
                }
            }
        },
        {
            $sort: {
                "chats.chatId": -1
            }
        }

    ]);

    return userChats
    
}
