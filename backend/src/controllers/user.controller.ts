import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { User, Chat, Thread } from '../model/User.js'
import jwt from 'jsonwebtoken'
import { verify } from 'crypto'
import { verifyToken } from '../validate/verifyToken.js'

type payload = {
    username: String,
    password: String
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body; 
        // save user in db
        const exists = await User.findOne({username})
        if (exists) return res.status(400).send("User already exists")

        res.clearCookie(process.env.COOKIE_NAME, {
            httpOnly: true,
            signed: true,
        })
        const hashedPw = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hashedPw})
        await newUser.save()


        // create jwt token and send back to user
        const payload: payload = {username, password}
        const token = jwt.sign(payload, process.env.COOKIE_SECRET, {expiresIn: process.env.COOKIE_EXPIRY || '7d'})
        console.log(token)
        res.cookie(process.env.COOKIE_NAME, token, {
            signed: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // expiry date
        })

        return res.status(201).json({username, password, message: 'ok'})
    } catch (e) {
        res.status(401).send(`Error, not authorized. ${e.message}`)
    }

}

export const userLogIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        console.log(user)
        if (!user) return res.status(404).send("User does not exist")
        const compare = await bcrypt.compare(password, user.password)
        if (!compare) return res.status(401).send("Incorrect password")
        res.clearCookie(process.env.COOKIE_NAME, {
            signed: true,
            httpOnly: true,
            domain: "localhost",
            path: "/"
        })
        // create jwt token and send back to user
        const payload: payload = {username, password}
        const token = jwt.sign(payload, process.env.COOKIE_SECRET, {expiresIn: process.env.COOKIE_EXPIRY || '7d'})
        res.cookie(process.env.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            signed: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // expiry date,
        })
        return res.status(200).json({username, password, message: "ok"})
    } catch (e) {
        return res.status(401).send(`Error logging in", ${e.message}`)
    }
}

export const userLogOut = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body
    try {
       const user = await User.find({username})
       res.clearCookie(process.env.COOKIE_NAME, {
        signed: true,
        httpOnly: true,
       }) 
    } catch (e) {
        console.log(e.message)
    }
}
