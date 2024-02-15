import { Router} from "express"
import { generateAIResponse, getUserChats } from "../controllers/chat.controller.js"
import { verifyToken } from "../validate/verifyToken.js"

const chatRouter = Router()

chatRouter.post("/", verifyToken, generateAIResponse)
chatRouter.put("/", verifyToken, generateAIResponse) // edit: just send newly edited message as entirely new message
chatRouter.get("/", verifyToken, getUserChats)

export default chatRouter