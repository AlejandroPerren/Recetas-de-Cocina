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
 * @param {Request} req Original request previous middleware of verification JWT
 * @param {Response} res Response to verification of JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    // Check HEADER from Request for 'x-access-token'
    const jwToken: any = req.headers['x-access-token'];

    if (!jwToken) {
        res.status(403).send({
            authentication: 'Missing JWT in request',
            message: 'Not authorized to consume this endpoint'
        });
        return;
    }

    jwt.verify(jwToken, KeyToken, (err: any, decoded: any) => {
        if (err) {
            res.status(403).send({
                authentication: 'JWT verification failed',
                message: 'Failed to verify JWT in request'
            });
            return;
        }
        // Attach the decoded token to the request object for further use
        req.body.user = decoded;
        next();
    });
};
