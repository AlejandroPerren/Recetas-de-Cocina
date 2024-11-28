//Entity model of database
import { userEntity } from "../entities/User.entity";

//interface User
import { IUser } from "../interfaces/IUser.interface";

//MSG
import { LogError } from "../../utils/logger"

//Get Entity
const userModel = userEntity();

//ORM handles Mongoose model methods


//Register ORM 
export const registerUser = async(user: IUser): Promise<any | undefined> => {
    try {
        //Create / Insert new user
        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User ${error}`)
    }
}
