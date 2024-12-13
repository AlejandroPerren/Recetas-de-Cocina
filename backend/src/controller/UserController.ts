import { Body, Delete, Get, Path, Put, Route, Tags } from "tsoa";

// ORM - Users Collection
import { getAllUsers, updateUser, deleteUser, getUserById } from "../domain/orm/Users.orm";

import { IUserController } from "./interfaces";
import { LogError, LogSuccess } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";



@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    @Get("/")
    public async getAllUsers(): Promise<any> {
        try {
            LogSuccess(`[/api/users] Get Users Request`);
            const response = await getAllUsers();
            return {
                status: 200,
                message: "Usuarios obtenidos correctamente",
                data: response,
            };
        } catch (error) {
            LogError(`[/api/users] Controller Error: ${error}`);
            return {
                status: 500,
                message: "Error obteniendo usuarios",
                error,
            };
        }
    }

    @Get("/{id}")
    public async getUserById(@Path() id: string): Promise<any> {
        try {
            LogSuccess(`[/api/users/${id}] Get User By ID Request`);
            const response = await getUserById(id);
            return {
                status: 200,
                message: "Usuario obtenido correctamente",
                data: response,
            };
        } catch (error) {
            LogError(`[/api/users/${id}] Controller Error: ${error}`);
            return {
                status: 500,
                message: "Error obteniendo usuario",
                error,
            };
        }
    }

    @Put("/{userId}")
    public async updateUser(@Body() user: Partial<IUser>, @Path() userId: string): Promise<any> {
        try {
            LogSuccess(`[/api/users/${userId}] Update User Request`);
            const response = await updateUser(userId, user);
            return {
                status: 200,
                message: "Usuario actualizado correctamente",
                data: response,
            };
        } catch (error) {
            LogError(`[/api/users/${userId}] Controller Error: ${error}`);
            return {
                status: 500,
                message: "Error actualizando usuario",
                error,
            };
        }
    }

    @Delete("/{id}")
    public async deleteUser(@Path() id: string): Promise<any> {
        try {
            LogSuccess(`[/api/users/${id}] Delete User Request`);
            const result = await deleteUser(id);
            if (result && result.deletedCount > 0) {
                return {
                    status: 200,
                    message: "Usuario borrado correctamente",
                };
            } else {
                return {
                    status: 404,
                    message: "Usuario no encontrado o ya fue borrado",
                };
            }
        } catch (error) {
            LogError(`[/api/users/${id}] Controller Error: ${error}`);
            return {
                status: 500,
                message: "Error borrando usuario",
                error,
            };
        }
    }
}
