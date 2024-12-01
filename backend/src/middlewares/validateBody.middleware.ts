import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

//Middleware for validate Register Body
const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
});

export const validateRegister = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

// Middleware for validate Login Body
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

// Middleware for validate Create New Recipe
const newRecipeSchema = yup.object().shape({
    title: yup.string().required("Title is Required"),

})

export const validateNewRecipe = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        await newRecipeSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};