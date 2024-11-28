//MSG
import { LogError } from "../../utils/logger";

//Interface of user
import { IUser } from "../interfaces/IUser.interface";

//entity of user
import { userEntity } from "../entities/User.entity";


/**
 * Method to obtain all Users from Collerction "users"
 */
//instance of entity
const userModel = userEntity();

export const getAllUsers = async (): Promise<any[]> => {
        try {
            //Search All users
            return await userModel.find({})  ;         
        } catch (error) {
            LogError(`[ORM ERROR]: Getting All Users: ${error}`);
        }
};
