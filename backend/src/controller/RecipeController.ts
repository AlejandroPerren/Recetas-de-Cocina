import { Body, Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";

//ORM - Recipes Collection
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getRecipeById, getAllRecipesByUser } from "../domain/orm/Recipes.orm";
import { IRecipeController } from "./interfaces";
import { LogError, LogSuccess } from "../utils/logger";
import { IRecipes } from "../domain/interfaces/IRecipe.interface";



@Route("/api/recipes")
@Tags("RecipesController")
export class RecipesController implements IRecipeController {
    @Get("/")
    public async getAllRecipes(): Promise<any> {
        try {
            LogSuccess(`[/api/recipes] Get Recipes Request`);
            const response = await getAllRecipes();
            return {
                status: 200,
                message: response,
            };
        } catch (error) {
            LogError(`[/api/recipes] Controller Error`);
            return {
                status: 500,
                message: "Error retrieving recipes",
                error,
            };
        }
    }

    @Get("/{_id}")
    public async getRecipeById(@Query() _id: string): Promise<any> {
        try {
            LogSuccess(`[/api/recipes/${_id}] Get Recipe Request`);
            const response = await getRecipeById(_id);
            return {
                status: 200,
                message: response,
            };
        } catch (error) {
            LogError(`[/api/recipes/${_id}] Controller Error`);
            return {
                status: 500,
                message: "Error retrieving the recipe",
                error,
            };
        }
    }
    @Get("/user/{userId}")
    public async getRecipesByUser(@Query() userId: string): Promise<any> {
        try {
            LogSuccess(`[Controller]: Fetching recipes for user ${userId}`);
            const recipes = await getAllRecipesByUser(userId);
    
            if (!recipes || recipes.length === 0) {
                return {
                    status: 404,
                    message: `No recipes found for user with ID ${userId}`,
                    data: [],
                };
            }
    
            return {
                status: 200,
                message: `Recipes fetched successfully for user ${userId}`,
                data: recipes, 
            };
        } catch (error) {
            LogError(`[Controller Error] Fetching recipes for user: ${error}`);
            return {
                status: 500,
                message: "Error retrieving recipes for the user",
                error,
            };
        }
    }
    
    @Post("/")
    public async createRecipe(@Body() recipe: IRecipes): Promise<any> {
        if (!recipe) {
            return {
                status: 400,
                message: "Recipe data is missing",
            };
        }
        
        LogSuccess(`[/api/recipes] Creating New Recipe: ${recipe.title}`);
        try {
            const response = await createRecipe(recipe);
            return {
                status: 200,
                message: `Recipe created successfully: ${recipe.title}`,
                data: response,
            };
        } catch (error) {
            LogError(`[REGISTER ERROR]: ${error}`);
            return {
                status: 500,
                message: "Error creating recipe.",
                error,
            };
        }
    }

    @Put("/{recipeId}")
    public async updateRecipe(@Body() recipe: Partial<IRecipes>, @Query() recipeId: string): Promise<any> {
        try {
            LogSuccess(`[/api/recipes/${recipeId}] Update Recipe by ID: ${recipeId}`);
            const response = await updateRecipe(recipeId, recipe);
            return {
                status: 200,
                message: "Receta actualizada correctamente",
                data: response,
            };
        } catch (error) {
            LogError(`[Controller Error] Updating Recipe: ${error}`);
            return {
                status: 500,
                message: "Error al actualizar la receta",
                error,
            };
        }
    }

    @Delete("/")
    public async deleteRecipe(@Query() _id?: string): Promise<any> {
        if (_id) {
            LogSuccess(`[/api/recipes] Delete Recipe by ID: ${_id}`);
            const result = await deleteRecipe(_id);
            if (result && result.deletedCount > 0) {
                return {
                    status: 200,
                    message: "Recipe deleted successfully",
                };
            } else {
                return {
                    status: 404,
                    message: "Recipe not found or already deleted",
                };
            }
        }
        return {
            status: 400,
            message: "Missing recipe ID",
        };
    }
}




