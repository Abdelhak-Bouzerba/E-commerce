import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export interface ExtendRequest extends Request {
    user?: any;
}

const validateJwt = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if(!authHeader) {
        res.status(403).send("No authorization header");
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(403).send("no token found");
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || '', async(err , payload) => {
        if (err) {
            res.status(403).send("invalid token");
            return;
        }
        if (!payload) {
            res.status(403).send("invalide payload");
            return;
        }
        const userPayload = payload as {
            email: String;
            firstName: String;
            lastName: String;
        };
        //fetch user from database 
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    })

}

export default validateJwt; 