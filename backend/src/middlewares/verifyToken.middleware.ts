import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const KeyToken: string | undefined = process.env.TOKEN_JSON_KEY;

if (!KeyToken) {
  throw new Error("TOKEN_JSON_KEY is not defined in environment variables");
}

/**
 * Middleware para verificar el JWT en el localStorage de la solicitud.
 * @param req Solicitud entrante al servidor
 * @param res Respuesta enviada al cliente
 * @param next Función para pasar al siguiente middleware
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // Obtener el token del localStorage de la solicitud (esto simula que lees el localStorage del frontend)
  const token = req.body.token || req.query.token || req.headers["token"]; // Verifica si hay un token en el cuerpo, query o encabezado

  console.log("Token recibido:", token);

  if (!token) {
    return res.status(403).json({
      authentication: "Missing JWT in request",
      message: "Not authorized to consume this endpoint",
    });
  }

  try {
    const decoded = jwt.verify(token, KeyToken); // Verificar el token
    req.body.user = decoded; // Guardamos los datos decodificados en `req.body`
    next(); // Continuar con el siguiente middleware o controlador
  } catch (err) {
    return res.status(403).json({
      authentication: "JWT verification failed",
      message: "Failed to verify JWT in request",
      error: err,
    });
  }
};
