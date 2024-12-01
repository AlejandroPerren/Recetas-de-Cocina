import { userEntity } from "../entities/User.entity";
import { IAuth, IUser } from "../interfaces/IUser.interface";
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

export const login = async(auth: IAuth): Promise<any | undefined> =>{
    try {
        return await userModel.findOne({email: auth.email});
    } catch (error) {
        LogError(`[ORM ERROR]: Logeando usuario ${error}`);
        throw new Error("Error al Buscar un Usuario usuario en la base de datos.");
    }
}
