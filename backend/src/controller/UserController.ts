// TSOA MSG
import { Body, Delete, Get,  Put,  Query,  Route, Tags } from "tsoa";

//ORM - Users Collection
import { getAllUsers, updateUser, deleteUser , getUserById } from "../domain/orm/Users.orm";


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

    @Get("/")
    public async getUserById(_id: any): Promise<any> {
        try {
            LogSuccess(`[/api/users:id] Get Recipe Request`)
            const response = await getUserById(_id);
            return {
                status: 200,
                message: response
            }
        } catch (error) {
            LogError(`[/api/users:id]Controller Error`)
            return {
                status: 500,
                message: "Error user User",
                error,
            }
        }

    }

    @Put("/users/:userId")
    public async updateUser(@Body() user: Partial<IUser>, @Query() userId: string): Promise<any> {
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

    @Delete("/")
    public async deleteUser(@Query() _id?: string): Promise<any> {
        if (_id) {
            LogSuccess(`[/api/users] Delete user by id: ${_id}`);
            const result = await deleteUser(_id);
            if (result && result.deletedCount > 0) {
                return {
                    status: 200,
                    message: "Borrado Correctamente",
                };
            } else {
                return {
                    status: 404,
                    message: "User not found or already deleted",
                };
            }
        }
        return {
            status: 400,
            message: "Missing User ID",
        };
        }
    }





