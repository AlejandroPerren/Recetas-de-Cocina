import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const KeyToken: string | undefined = process.env.TOKEN_JSON_KEY;

if (!KeyToken) {
    throw new Error("TOKEN_JSON_KEY is not defined in environment variables");
}

/**
 * Middleware to verify the JWT in the request header.
 * @param req Original request previous middleware of verification JWT
 * @param res Response to verification of JWT
 * @param next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        res.status(403).json({
            authentication: 'Missing JWT in request',
            message: 'Not authorized to consume this endpoint'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, KeyToken);
        req.body.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({
            authentication: 'JWT verification failed',
            message: 'Failed to verify JWT in request',
            error: err
        });
    }
};
