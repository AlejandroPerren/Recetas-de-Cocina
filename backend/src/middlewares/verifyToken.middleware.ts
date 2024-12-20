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
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  console.log("Token recibido:", token);

  if (!token) {
    return res.status(403).json({
      authentication: "Missing JWT in request",
      message: "Not authorized to consume this endpoint",
    });
  }

  try {
    const decoded = jwt.verify(token, KeyToken);
    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      authentication: "JWT verification failed",
      message: "Failed to verify JWT in request",
      error: err,
    });
  }
};
