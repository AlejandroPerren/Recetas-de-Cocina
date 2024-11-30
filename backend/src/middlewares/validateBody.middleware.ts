import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

//Schema of Register
const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
});

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await registerSchema.validate(req.body, { abortEarly: false });
        next(); 
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};

// Middleware for validate Register Body
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await loginSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};

