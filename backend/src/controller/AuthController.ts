//Documentation of tsoa MSG
import { Body, Post, Route, Tags } from "tsoa";

//ORM IMPORT
import { registerUser } from "../domain/orm/Auth.orm";

//Interface of User body import
import { IUser } from "../domain/interfaces/IUser.interface";

//MSG 
import { LogError, LogSuccess } from "../utils/logger";


//Controllers handles the base logic of the code

@Route("/api/auth")
@Tags("AuthController")
export class AuthController {
    @Post("/register")
    public async registerUser(@Body() user: IUser): Promise<any> {
        if (user) {
            LogSuccess(`[/api/auth/register] Registering new user: ${user.email}`)
            try {
                const response = await registerUser(user);
                return { message: `User created successfully: ${user.name}`, data: response };
            } catch (error) {
                LogError(`[REGISTER ERROR]: ${error}`);
                return { message: "Error registering user.", error };
            }
        }
    }
}