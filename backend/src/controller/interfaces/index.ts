import { IUser } from "../../domain/interfaces/IUser.interface";


export interface IUserController {
    //Get all users
    getAllUsers(): Promise<any>
}

export interface IAuthController {
    //register Users
    registerUser(user: IUser): Promise<any>

}