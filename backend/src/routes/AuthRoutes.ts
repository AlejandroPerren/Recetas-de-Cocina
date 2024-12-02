import express, { Request, Response } from "express";
import bodyParser from "body-parser";

// Middleware de validación de datos
import { validateLogin, validateRegister } from "../middlewares/validateBody.middleware";

// Controlador
import { AuthController } from "../controller/AuthController";

// Configuración del Router
const authRouter = express.Router();

// Middleware para procesar JSON
const jsonParser = bodyParser.json();

// Instancia del controlador
const controller: AuthController = new AuthController();

// TODO: Crear un cuerpo correcto para las peticiones y sus errores

// Ruta de registro
authRouter.route('/register')
    .post(jsonParser, validateRegister, async (req: Request, res: Response): Promise<any> => {
        
        try {
            const { name, email, password } = req.body;
            const response = await controller.registerUser({ name, email, password });
            if (response && response.status) {
                return res.status(response.status).json(response);
            }
            res.status(500).json({ message: "Respuesta inválida del controlador" });
        } catch (error) {
            res.status(500).json({ message: "Error al registrar el usuario", error });
        }
    });

//Login
authRouter.route('/login')
    .post(jsonParser, validateLogin, async (req: Request, res: Response): Promise<any> => {
    try {
    const { email, password } = req.body;
        const response = await controller.login({ email, password });

        // Aplica explícitamente el código de estado y envía la respuesta
        if (response && response.status) {
            return res.status(response.status).json(response);
        }

        // Si no hay un código de estado en la respuesta, asume un error interno
        res.status(500).json({ message: "Respuesta inválida del controlador" });
    } catch (error) {
        res.status(500).json({ message: "Error inesperado en la solicitud", error });
    }
});

export default authRouter;
