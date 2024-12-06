// TSOA MSG
import { Body, Get,  Put,  Query,  Route, Tags } from "tsoa";

//ORM - Users Collection
import { getAllUsers, updateUser } from "../domain/orm/Users.orm";


import { IUserController } from "./interfaces";
import { LogError, LogSuccess } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";


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
    @Put("/recipes/:recipeId")
    public async updateUSer(@Body() user: Partial<IUser>, @Query() userId: string): Promise<any> {
        try {
            const response = await updateUser(userId, user)
            return {
                status: 200,
                message: "Usuario actualizado correctamente",
                data: response,
            };
        } catch (error) {
            LogError(`[Controller Error] Updating Recipe: ${error}`);
            return {
                status: 500,
                message: "Error al actualizar el Usuario",
                error,
            };
        }
    }





}
