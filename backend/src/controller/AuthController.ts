import { Body, Post, Route, Tags } from "tsoa";
import { IUser } from "../domain/interfaces/IUser.interface";
import { login, registerUser } from "../domain/orm/Auth.orm";
import { LogError, LogSuccess } from "../utils/logger";


import dotenv from "dotenv"
dotenv.config();

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IAuth } from "../domain/interfaces/IUser.interface";
const TOKEN_KEY: any = process.env.TOKEN_JSON_KEY;

// Controlador de autenticación
@Route("/api/auth")
@Tags("AuthController")
export class AuthController {

    /**
     * Endpoint for register New User to DB.
     * @param user data for register.
     * @returns msg whit result.
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

            const response = await registerUser(user);
            return { 
                status: 200,
                message: `Usuario creado exitosamente: ${user.name}`, 
                data: response };
        } catch (error) {
            return {
                status: 500,
                message: "Error al iniciar sesión",
                error,
            };
        }
    }

    @Post("/login")
    public async login(@Body() auth: IAuth): Promise<any> {
        try {
            const user = await login(auth);

            if (!user) {
                return {
                    status: 404,
                    message: "Usuario no encontrado",
                };
            }

            const validPassword = bcrypt.compareSync(auth.password, user.password);

            if (!validPassword) {
                return {
                    status: 401,
                    message: "Contraseña incorrecta",
                };
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                TOKEN_KEY,
                { expiresIn: "1h" }
            );

            LogSuccess(`[/api/auth/login] Usuario logeado: ${user.email}`);
            return {
                status: 200,
                message: "Login exitoso",
                token,
                user: { id: user.id, email: user.email, name: user.name },
            };
        } catch (error) {
            LogError(`[LOGIN ERROR]: ${error}`);
            return {
                status: 500,
                message: "Error al iniciar sesión",
                error,
            };
        }
    }
}