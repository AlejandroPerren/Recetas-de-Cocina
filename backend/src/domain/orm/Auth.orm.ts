import { userEntity } from "../entities/User.entity";
import { IUser } from "../interfaces/IUser.interface";
import { LogError } from "../../utils/logger";

// instance of entity 
const userModel = userEntity();

// Register user in db
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        // insert user in DB
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Creando usuario ${error}`);
        throw new Error("Error al registrar usuario en la base de datos.");
    }
}
