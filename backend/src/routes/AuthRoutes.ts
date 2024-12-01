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

// Ruta de registro
authRouter.route('/register')
    .post(jsonParser, validateRegister, async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const response = await controller.registerUser({ name, email, password });
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({ message: "Error al registrar el usuario", error });
        }
    });

//Login
authRouter.route('/login').post(jsonParser, validateLogin, async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const response = await controller.login({ email, password });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ message: "Error al iniciar sesión", error });
    }
});

export default authRouter;
