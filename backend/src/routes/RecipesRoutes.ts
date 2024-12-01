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
import { validateNewRecipe } from "../middlewares/validateBody.middleware";

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

    .post(jsonParser,validateNewRecipe, async (req: Request, res: Response) => {
        try {
            //body of Request
            const { title, description, ingredients, steps, cookingTime, type, image } = req.body;
            //userId by params
            const userid = "6748e901c4fc8033a37f1626";

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
            //send Response
            const response = await controller.createRecipe(newRecipe);
            res.status(201).send(response);

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno del servidor.' });
        }
    });



export default recipesRouter;