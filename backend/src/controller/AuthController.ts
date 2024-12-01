import { Body, Post, Route, Tags } from "tsoa";
import { IUser } from "../domain/interfaces/IUser.interface";
import { registerUser } from "../domain/orm/Auth.orm";
import { LogError, LogSuccess } from "../utils/logger";

import bcrypt from "bcrypt"
import { IAuth } from "../domain/interfaces/IUser.interface";
// Controlador de autenticación
@Route("/api/auth")
@Tags("AuthController")
export class AuthController {

    /**
     * Endpoint para registrar un nuevo usuario.
     * @param user Información del usuario a registrar.
     * @returns Mensaje con el resultado de la operación.
     */
    @Post("/register")
    public async registerUser(@Body() user: IUser): Promise<any> {
        if (!user) {
            return { message: "Datos inválidos" };
        }

        //encrypt password 
        const hashedPassword = await bcrypt.hashSync(user.password, 10)

        user.password = hashedPassword;
        LogSuccess(`[/api/auth/register] Registrando nuevo usuario: ${user.email}`);

        try {
            // Llamamos al ORM para registrar al usuario
            const response = await registerUser(user);
            return { message: `Usuario creado exitosamente: ${user.name}`, data: response };
        } catch (error) {
            LogError(`[REGISTER ERROR]: ${error}`);
            return { message: "Error registrando el usuario.", error };
        }
    }

    @Post("/login")
    public async login(@Body() auth: IAuth): Promise<any>{
        
    }
}
