// TSOA MSG
import { Get,  Route, Tags } from "tsoa";

//ORM - Users Collection
import { getAllUsers } from "../domain/orm/Users.orm";


import { IUserController } from "./interfaces";
import { LogError, LogSuccess } from "../utils/logger";


@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint to retrieve users from the "Users" collection in the DB.
     * @returns all users
     */
    @Get("/")
    public async getAllUsers(): Promise<any> {
        try {
            LogSuccess(`[/api/users] Get Users Request`)
            const response = await getAllUsers();
            return{
                status: 200,
                message: response
            }
        } catch (error) {
            LogError(`[/api/users]Controller Error`)
            return{status: 500,
                message: "Error Get Users",
                error,}   
        }
    }





}
