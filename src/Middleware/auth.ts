import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const JWT_KEY: string = process.env.JWT_KEY || '';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies.jwt;
    if (!token) return res.status(401).json({message:'Access denied. No token provided'});
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        (req as any).user = decoded
        next();
    } catch (ex) {
        res.status(400).send('Invalid token')
    }
}