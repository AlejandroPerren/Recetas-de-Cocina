import { Body, Post, Route, Tags } from "tsoa";
import { IUser, IAuth } from "../domain/interfaces/IUser.interface";
import { login, registerUser } from "../domain/orm/Auth.orm";
import { LogError, LogSuccess } from "../utils/logger";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const TOKEN_KEY: string = process.env.TOKEN_JSON_KEY || "";

// Controlador de autenticación
@Route("/api/auth")
@Tags("AuthController")
export class AuthController {
    @Post("/register")
    public async registerUser(@Body() user: IUser): Promise<any> {
        if (!user) {
            return { status: 400, message: "Datos inválidos" };
        }

        user.password = bcrypt.hashSync(user.password, 10);
        LogSuccess(`Registrando nuevo usuario: ${user.email}`);

        try {
            const response = await registerUser(user);
            return {
                status: 200,
                message: `Usuario creado exitosamente: ${user.name}`,
                data: response,
            };
        } catch (error) {
            LogError(`Error en registro: ${error}`);
            return { status: 500, message: "Error en el registro", error };
        }
    }

    @Post("/login")
    public async login(@Body() auth: IAuth): Promise<any> {
        try {
            const user = await login(auth);

            if (!user) {
                return { status: 404, message: "Usuario no encontrado" };
            }

            const isValidPassword = bcrypt.compareSync(auth.password, user.password);

            if (!isValidPassword) {
                return { status: 401, message: "Contraseña incorrecta" };
            }

            const token = jwt.sign({ id: user.id, email: user.email }, TOKEN_KEY, {
                expiresIn: "1h",
            });

            LogSuccess(`Usuario logeado: ${user.email}`);
            return {
                status: 200,
                message: "Login exitoso",
                token,
                user: { id: user.id, email: user.email, name: user.name },
            };
        } catch (error) {
            LogError(`Error en login: ${error}`);
            return { status: 500, message: "Error al iniciar sesión", error };
        }
    }
}
