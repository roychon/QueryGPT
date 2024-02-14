import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from './routers/userRouter.js'
import cookieParser from "cookie-parser"
import chatRouter from "./routers/chatRouter.js"

dotenv.config()
const app = express()

const PORT_NUM:string = process.env.PORT_NUM || '5000';
const MONGODB_URL: string = process.env.MONGODB_URL

// middleware
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

// routes
app.use("/user", userRouter)
app.use("/chat", chatRouter)

// start server + connect to db
app.listen(PORT_NUM, async () => {
  try {
    console.log('server is running')
    await mongoose.connect(MONGODB_URL)
    console.log('connected to database')
  } catch (e) {
    console.log(`Error connecting to db: ${e.message}`)
  }
})

