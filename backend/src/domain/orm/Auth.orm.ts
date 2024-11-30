//Entity model of database
import { userEntity } from "../entities/User.entity";

//interface User
import { IAuth, IUser } from "../interfaces/IUser.interface";

//MSG
import { LogError } from "../../utils/logger"

//Intance of entity
const userModel = userEntity();

//ORM handles Mongoose model methods

//dotenv
import dotenv from "dotenv";
dotenv.config()

//Security auth
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//Register User ORM 
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        //Create / Insert new user
        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User ${error}`)
    }
}

//Login User ORM
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    //Login User
    try {
        //find user by email
        userModel.findOne({ email: auth.email }, (err, user: IUser) => {
            if (err) {
                //TODO: return Error --> user while searching(500)
            }
            if (!user) {
                //TODO: return Error --> Error user Not Found(404) 
            }
        const validPassword = bcrypt.compareSync(auth.password, user.password);

        if(!validPassword){
            // TODO --> not authorised(401)
        }
    
        const token: any = jwt.sign({email: user.email}, process.env.TOKEN_JSON_KEY);
        })
        
        return token;
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User ${error}`);
    }

}

//logout User ORM
export const logoutUser = async (user: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        //create / Insert new User
        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User ${error}`);
    }
}