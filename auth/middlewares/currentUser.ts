import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUSer?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        next()
    }

    try {
        const payload = jwt.verify(req.session!.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUSer = payload
    } catch (error) {}
    next()
}