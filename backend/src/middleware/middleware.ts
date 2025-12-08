import jwt from "jsonwebtoken";
import type { AuthRequest, jwtPayload } from "../types/common";
import { Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authenticate = (req: AuthRequest, res:Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({
            error: "No token provided",
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwtPayload;
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            error: "Invalid token",
        })
    }
}