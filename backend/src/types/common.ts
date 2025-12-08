import Request from "express";

export interface AuthRequest extends Request {
    cookies: any;
    user?: {
        id:number;
        email: string;
    }
};

export interface jwtPayload {
    id: number;
    email: string;
}