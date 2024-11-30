import express, { Request, Response } from "express";
import { LogError } from "../utils/logger";

//controller
import { RecipesController } from "../controller/RecipeController";

//Interface Recipe
import { IRecipes } from "../domain/interfaces/IRecipe.interface";

//Router From express
const recipesRouter = express.Router();

//Controller initiate 
const controller: RecipesController = new RecipesController();

import bodyParser from "body-parser";

// Middleware
const jsonParser = bodyParser.json();

recipesRouter
    .route("/")
    .get(
        async (req: Request, res: Response) => {
            try {
                //Obtain the Response
                const response = await controller.getAllRecipes();
                //send response
                res.status(200).send(response);
            } catch (error) {
                LogError(`[GET /api/recipes] Error: ${error}`)
                res.status(500).send({
                    message: "Error Retrieving recipes",
                    error: error,
                });
            }
        })

    .post(jsonParser, async (req: Request, res: Response) => {
        try {
            const { title, description, ingredients, steps, cookingTime, type, image } = req.body;
            const userid = req.params.id
            if (!title || !description || !ingredients || !steps || !cookingTime || !type) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }
    
            if (!Array.isArray(ingredients) || !Array.isArray(steps)) {
                return res.status(400).json({ error: 'Ingredientes y pasos deben ser arreglos.' });
            }
    
            const newRecipe: IRecipes = {
                title,
                description,
                ingredients,
                steps,
                cookingTime,
                type,
                image,
                createdBy: userid, 
            };
    
            const response = await controller.createRecipe(newRecipe);
            res.status(201).send(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    });



export default recipesRouter;