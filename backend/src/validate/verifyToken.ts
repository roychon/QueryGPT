import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.signedCookies[process.env.COOKIE_NAME]
    if (token == null) return res.status(400).send("no cookie")
    jwt.verify(token, process.env.COOKIE_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403)
        res.locals.user = payload  
        next()
    })
}
