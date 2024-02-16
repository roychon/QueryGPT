import express from 'express'
import { userLogIn, userLogOut, userSignUp, verifyUser } from '../controllers/user.controller.js'
import { verifyToken } from '../validate/verifyToken.js'

const userRouter  = express.Router()

userRouter.post("/signup", userSignUp)
userRouter.post("/login", userLogIn)
userRouter.post("/logout", userLogOut)
userRouter.get("/checkAuthStatus", verifyToken, verifyUser) // TODO: add verifyUser function

export default userRouter