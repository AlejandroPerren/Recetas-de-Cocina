import express, { Request, Response } from "express";
import { LogError } from "../utils/logger";
import bodyParser from "body-parser";

//controller
import { UserController } from "../controller/UserController";
import mongoose from "mongoose";
import { validateRegister } from "../middlewares/validateBody.middleware";
import { IUser } from "../domain/interfaces/IUser.interface";
import { verifyToken } from "../middlewares/verifyToken.middleware";



//Router From express
const userRouter = express.Router();

// Middleware para procesar JSON
const jsonParser = bodyParser.json();

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

userRouter
    .route("/:userId")
    .get(async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = req.body.user.userId;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid user ID format",
                });
            }
            const response = await controller.getUserById(userId);
            if (response && response.status) {
                return res.status(response.status).json(response);
            }

            res.status(500).json({ message: "Invalid response for controller" });
        } catch (error) {
            LogError(`[GET /api/users/id] Error: ${error}`)
            res.status(500).send({
                message: "Error Retrieving user",
                error: error,
            })
        }
    })

    .put(verifyToken, jsonParser, validateRegister, async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = req.body.user.userId;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid user ID format",
                });
            }

            const updatedData: Partial<IUser> = {
                ...req.body,
                updateBy: userId,
            };

            const response = await controller.updateUser(updatedData, userId);

            if (response && response.status) {
                return res.status(response.status).json(response);
            }

            res.status(500).json({ message: "Invalid response for controller" });
        } catch (error) {
            LogError(`[GET /api/users] Error: ${error}`)
            res.status(500).send({
                message: "Error Retrieving Users",
                error: error,
            });
        }
    })
    .delete(verifyToken, async (req: Request, res: Response): Promise<any> => {
        try {
            const userId = req.params.userId;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid user ID format",
                });
            }
            const response = await controller.deleteUser(userId);
            if (response && response.status) {
                return res.status(response.status).json(response);
            }

            res.status(500).json({ message: "Invalid response for controller" });
        } catch (error) {
            LogError(`[GET /api/users/id] Error: ${error}`)
            res.status(500).send({
                message: "Error Delete user",
                error: error,
            })
        }
    })

export default userRouter;