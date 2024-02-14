import { Router} from "express"
import { generateAIResponse, getUserChats } from "../controllers/chat.controller.js"
import { verifyToken } from "../validate/verifyToken.js"

const chatRouter = Router()

chatRouter.post("/", verifyToken, generateAIResponse)
// chatRouter.put("/", verifyToken, editChatMessage)
chatRouter.get("/", verifyToken, getUserChats)

export default chatRouter