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
        async (req: Request, res: Response): Promise<any> => {
            try {
                //Obtain the Response
                const response = await controller.getAllRecipes();
                //send response
                if (response && response.status) {
                    return res.status(response.status).json(response);
                }
                res.status(500).json({ message: "Invalid response for controller" });
            } catch (error) {
                LogError(`[GET /api/recipes] Error: ${error}`)
                res.status(500).send({
                    message: "Error Retrieving recipes",
                    error: error,
                });
            }
        })

    .post(jsonParser, validateNewRecipe, async (req: Request, res: Response): Promise<any> => {
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
            if (response && response.status) {
                return res.status(response.status).json(response);
            }

            // Si no hay un código de estado en la respuesta, asume un error interno
            res.status(500).json({ message: "Respuesta inválida del controlador" });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno del servidor.' });
        }
    });



export default recipesRouter;