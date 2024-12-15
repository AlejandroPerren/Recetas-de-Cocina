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
import mongoose from "mongoose";
import { verifyToken } from "../middlewares/verifyToken.middleware";


// Middleware
const jsonParser = bodyParser.json();

//Routes Recipes
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
    .post(verifyToken ,jsonParser, validateNewRecipe, async (req: Request, res: Response): Promise<any> => {
        try {
            //body of Request
            const { title, description, ingredients, steps, cookingTime, type, image } = req.body;
            //id by query
            const userId = "674b21d71404dd30eb87a061" as string
            //userId by params


            const newRecipe: IRecipes = {
                title,
                description,
                ingredients,
                steps,
                cookingTime,
                type,
                image,
                createdBy: userId,
            };
            //send Response
            const response = await controller.createRecipe(newRecipe);
            if (response && response.status) {
                return res.status(response.status).json(response);
            }
            res.status(500).json({ message: "Respuesta inválida del controlador" });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error interno del servidor.' });
        }
    })

//Routes Recipes whit id params
recipesRouter
    .route("/:recipeId")
    .get(async (req: Request, res: Response): Promise<any> => {
        try {
            const recipeId = req.params.recipeId;
            if (!mongoose.Types.ObjectId.isValid(recipeId)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid Recipe ID format",
                });
            }
            const response = await controller.getRecipeById(recipeId);
            if (response && response.status) {
                return res.status(response.status).json(response);
            }

            res.status(500).json({ message: "Invalid response for controller" });
        } catch (error) {
            LogError(`[GET /api/recipes] Error: ${error}`)
            res.status(500).send({
                message: "Error Retrieving recipe",
                error: error,
            })
        }
    })
    .put(verifyToken, jsonParser, validateNewRecipe, async (req: Request, res: Response): Promise<any> => {
        try {
            const recipeId = req.params.recipeId;
            const userId = "6748e901c4fc8033a37f1626";

            if (!mongoose.Types.ObjectId.isValid(recipeId)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid Recipe ID format",
                });
            }

            const updatedData: Partial<IRecipes> = {
                ...req.body,
                updateBy: userId,
            };

            const response = await controller.updateRecipe(updatedData, recipeId);

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
    .delete(verifyToken, async (req: Request, res: Response): Promise<any> => {
        try {
            const recipeId = req.params.recipeId;
    
            if (!recipeId || !mongoose.Types.ObjectId.isValid(recipeId)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid recipe ID format",
                });
            }
    
            const response = await controller.deleteRecipe(recipeId);
    
            if (response && response.status === 200) {
                return res.status(200).json(response);
            } else {
                return res.status(response?.status || 500).json(response || {
                    message: "Unknown error occurred",
                });
            }
        } catch (error) {
            LogError(`[DELETE /api/recipes/:recipeId] Error: ${error}`);
            return res.status(500).send({
                message: "Error deleting recipe",
                error: error,
            });
        }
    })

    recipesRouter.get("/user/:userId",async (req: Request, res: Response): Promise<any> => {
            try {
                const userId = req.params.userId;
    
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    return res.status(400).json({
                        status: 400,
                        message: "Invalid User ID format",
                    });
                }

                const response = await controller.getRecipesByUser(userId);
    
                if (response && response.status) {
                    return res.status(response.status).json(response);
                }
    
                return res.status(500).json({
                    message: "Invalid response from controller",
                });
            } catch (error) {
                LogError(`[GET /api/recipes/user/:userId] Error: ${error}`);
                return res.status(500).json({
                    message: "Error retrieving recipes for user",
                    error,
                });
            }
        }
    );
    
    
  

export default recipesRouter;