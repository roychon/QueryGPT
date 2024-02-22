import { Router} from "express"
import { createNewThread, deleteThread, generateAIResponse, getUserChats, getUserThreads, renameThread } from "../controllers/chat.controller.js"
import { verifyToken } from "../validate/verifyToken.js"

const chatRouter = Router()

chatRouter.post("/", verifyToken, generateAIResponse)
chatRouter.put("/", verifyToken, generateAIResponse) // edit: just send newly edited message as entirely new message
chatRouter.post("/getUserChats", verifyToken, getUserChats)
chatRouter.put("/rename-thread", verifyToken, renameThread)
chatRouter.delete("/delete-thread", verifyToken, deleteThread)
chatRouter.post("/thread", verifyToken, createNewThread)
chatRouter.get("/threads", verifyToken, getUserThreads)
// chatRouter.post("/hand-to-text", verifyToken, handToText)

export default chatRouter
