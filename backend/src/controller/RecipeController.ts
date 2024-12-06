import { Body, Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";

//ORM - Recipes Collection
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getRecipeById } from "../domain/orm/Recipes.orm";
import { IRecipeController } from "./interfaces";
import { LogError, LogSuccess } from "../utils/logger";
import { IRecipes } from "../domain/interfaces/IRecipe.interface";



@Route("/api/recipes")
@Tags("RecipesController")
export class RecipesController implements IRecipeController {
    /**
    * Endpoint to retrieve recipes from the "Recipes" collection in the DB.
    * @returns all Recipes
    */
    @Get("/")
    public async getAllRecipes(): Promise<any> {
        try {
            LogSuccess(`[/api/recipes] Get Recipes Request`)
            const response = await getAllRecipes();
            return {
                status: 200,
                message: response
            }
        } catch (error) {
            LogError(`[/api/recipes]Controller Error`)
            return {
                status: 500,
                message: "Error recipes Users",
                error,
            }
        }

    }
       /**
    * Endpoint to retrieve recipe from the "Recipes" collection in the DB Browser by ID.
    * @returns One Recipe
    */
    @Get("/")
    public async getRecipeById(_id: any): Promise<any> {
        try {
            LogSuccess(`[/api/recipes] Get Recipe Request`)
            const response = await getRecipeById(_id);
            return {
                status: 200,
                message: response
            }
        } catch (error) {
            LogError(`[/api/recipes]Controller Error`)
            return {
                status: 500,
                message: "Error recipe User",
                error,
            }
        }

    }
    /**
   * Endpoint to Create recipes from the "Recipes" collection in the DB.
   * @returns MSG recipes result, if result = Successfull, save recipe 
   */
    @Post("/recipes")
    public async createRecipe(@Body() recipe: IRecipes): Promise<any> {
        if (recipe) {
            LogSuccess(`[/api/recipes] Creating New Recipe: ${recipe.title}`);
            try {
                const response = await createRecipe(recipe);
                return {
                    status: 200,
                    message: `Recipe created successfully: ${recipe.title}`,
                    data: response
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
    }

    @Put("/recipes/:recipeId")
    public async updateRecipe(@Body() recipe: Partial<IRecipes>, @Query() recipeId: string): Promise<any> {
        try {
            LogSuccess(`[/api/recipes/:recipeId] Update Recipe by ID: ${recipeId}`);
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
    public async deleteRecipe(@Query() _id?: any): Promise<any> {
        if (_id) {
            LogSuccess(`[/api/recipes] Delete Recipe by id: ${_id}`);
            await deleteRecipe(_id);
            return {
                status: 200,
                message: "Borrado Correctamente"
            }
        }
    }
}