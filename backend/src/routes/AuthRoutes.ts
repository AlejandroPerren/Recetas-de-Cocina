import express, { Request, Response } from "express";

import bodyParser from "body-parser";

//Security Auth
import bcrypt from "bcrypt";
import { IUser } from "../domain/interfaces/IUser.interface";
import { AuthController } from "../controller/AuthController";
//config Router
const authRouter = express.Router();

// Middleware
const jsonParser = bodyParser.json();

// TODO: express-validator
//Route of Register
authRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {
        //Body of Request recibe name, email, password
        const { name, email, password } = req.body;

        if (name && email && password) {
            //Encrypt password
            const hashPassword = bcrypt.hashSync(password, 10);

            //integrate interface to body
            const newUser: IUser = {
                name,
                email,
                password: hashPassword
            };

            // Instantiate the controller
            const controller: AuthController = new AuthController();

            //send Response
            const response = await controller.registerUser(newUser);
            res.status(200).send(response);
        } else {
            res.status(400).send({ message: "Invalid Input Data" });
        }
    });



export default authRouter;