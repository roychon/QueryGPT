import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from './routers/userRouter.js'
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

const PORT_NUM:string = process.env.PORT_NUM || '5000';
const MONGODB_URL: string = process.env.MONGODB_URL

// middleware
app.use(express.json())
app.use(cookieParser("7dce94a7803a7505213ac591dcc9263290654fb9a8f3f2c3d73f83088e634d5ffcc2f7eb68130a0380768f9ede5aa3dd2ec59d61c461ded4e2c70d3263870e0b"))

// routes
app.use("/user", userRouter)

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

