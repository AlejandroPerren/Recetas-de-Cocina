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


// Esquema para validar la creación de una nueva receta
const newRecipeSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    ingredients: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string().required("Ingredient name is required"),
                quantity: yup.string().required("Ingredient quantity is required"),
            })
        )
        .min(1, "At least one ingredient is required")
        .required("Ingredients are required"),
    steps: yup
        .array()
        .of(
            yup.object().shape({
                stepNumber: yup
                    .number()
                    .min(1, "Step number must be at least 1")
                    .required("Step number is required"),
                instruction: yup
                    .string()
                    .required("Step instruction is required"),
            })
        )
        .min(1, "At least one step is required")
        .required("Steps are required"),
    cookingTime: yup
        .number()
        .min(1, "Cooking time must be at least 1 minute")
        .required("Cooking time is required"),
    type: yup.string().required("Type is required"),
    image: yup
        .string()
        .url("Image must be a valid URL")
        .required("Image is required"),
});
// Middleware para validar la creación de recetas
export const validateNewRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
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
