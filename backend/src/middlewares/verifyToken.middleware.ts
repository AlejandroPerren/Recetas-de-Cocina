
import jwt from "jsonwebtoken"

import { Request, Response, Nextfunction } from "express"

import dotenv from "dotenv"

dotenv.config();

const KeyToken: any = process.env.TOKEN_JSON_KEY;

/**
 * 
 * @param {Request} req Original request previous middleware of verification JWT
 * @param {Response} res Response to verification of JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification or next execution
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction){
    //Check HEADER from Request for 'x-access-token'
    const jwToken: any = req.headers('x-acces-token');

    if (jwToken) {
        return res.status(403).send({
            authentication: 'Missing JWT in request',
            message: 'Not autorised to consume this endpoint'
        })
    }

    jwt.verify(jwToken, KeyToken, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).send({
                authentication: 'JWT verification Failed',
                message: 'Failed to verify JWT in request'
            })
        }
    })

    //Execute Next Function => Protected Route
    next();
}