import express, { Request, Response } from "express";
import { LogError } from "../utils/logger";

//controller
import { UserController } from "../controller/UserController";

//Router From express
const userRouter = express.Router();

//Controller initiate 
const controller: UserController = new UserController();

userRouter
    .route("/")
    .get(async (req: Request, res: Response): Promise<any> => {
        try {
            //Obtain the Response
            const response = await controller.getAllUsers();

            if (response && response.status) {
                return res.status(response.status).json(response);
            }

            // Si no hay un código de estado en la respuesta, asume un error interno
            res.status(500).json({ message: "Respuesta inválida del controlador" });
        } catch (error) {
            LogError(`[GET /api/users] Error: ${error}`)
            res.status(500).send({
                message: "Error Retrieving users",
                error: error,
            });
        }
    })


export default userRouter;