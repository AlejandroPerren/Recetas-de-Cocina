//MSG
import { LogError } from "../../utils/logger";

//Interface of user
import { IUser } from "../interfaces/IUser.interface";

//entity of user
import { userEntity } from "../entities/User.entity";
import mongoose from "mongoose";


/**
 * Method to obtain all Users from Collerction "users"
 */

//instance of entity
const userModel = userEntity();

export const getAllUsers = async (): Promise<any> => {
    try {
        //Search All users
        return await userModel.find({});
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }
};


export const updateUser = async (_id: string, updateData: any): Promise<any> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new Error("Invalid User ID");
        }
        return await userModel.findByIdAndUpdate(_id, updateData)
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Recipe ${error}`);
        throw error;
    }
}

export const getUserById = async (_id: string): Promise<any> => {
    try {
        return await userModel.findById({ _id })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting User: ${error}`);
    }
}


export const deleteUser = async (_id: string): Promise<any | undefined> => {
    try {
        return await userModel.deleteOne({ _id  })
    } catch (error) {
        LogError(`[ORM ERROR]: Delete User ${error}`);
    }
};
