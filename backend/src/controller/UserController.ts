// TSOA MSG
import { Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from "tsoa";

//ORM - Users Collection
import { getAllUsers } from "../domain/orm/Users.orm";


import { IUserController } from "./interfaces";
import { LogSuccess } from "../utils/logger";


@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint to retrieve users from the "Users" collection in the DB.
     * @returns all users
     */
    @Get("/")
    public async getAllUsers(): Promise<any> {
        LogSuccess(`[/api/users] Get Users Request`)
        return await getAllUsers();
    }





}
