import express, { Request, Response} from "express";
import { LogError } from "../utils/logger";

//controller
import { UserController } from "../controller/UserController"; 

//Router From express
const userRouter = express.Router();

//Controller initiate 
const controller: UserController = new UserController();

userRouter
    .route("/")
    .get(async (req: Request, res: Response)=>{
        try {
            //Obtain the Response
            const response = await controller.getAllUsers();

            //send response
            res.status(200).send(response);

        } catch (error) {
            LogError(`[GET /api/users] Error: ${error}`)
            res.status(500).send({
                message: "Error Retrieving users",
                error: error,
            });
        }
    })


export default userRouter;