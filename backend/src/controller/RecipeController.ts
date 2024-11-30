import { Body, Get, Post, Route, Tags } from "tsoa";

//ORM - Recipes Collection
import { getAllRecipes, createRecipe } from "../domain/orm/Recipes.orm";
import { IRecipeController } from "./interfaces";
import { LogError, LogSuccess } from "../utils/logger";
import { IRecipes } from "../domain/interfaces/IRecipe.interface";



@Route("/api/recipes")
@Tags("RecipesController")
export class RecipesController implements IRecipeController{
     /**
     * Endpoint to retrieve recipes from the "Recipes" collection in the DB.
     * @returns all users
     */
    @Get("/")
    public async getAllRecipes(): Promise<any>{
        LogSuccess(`[/api/recipes] Get Recipes Request`)
        return await getAllRecipes();
    }
      /**
     * Endpoint to Create recipes from the "Recipes" collection in the DB.
     * @returns MSG recipes result, if result = Successfull, save recipe 
     */
    @Post("/recipes")
    public async createRecipe(@Body() recipe: IRecipes): Promise<any> {
        if(recipe){
            LogSuccess(`[/api/recipes] Creating New Recipe: ${recipe.title}`);
            try {
                const response = await createRecipe(recipe);
                return {
                    message: `Recipe created Succesfull: ${recipe.title}`,
                    data: response
                };
            } catch (error) {
                LogError(`[REGISTER ERROR]: ${error}`);
                return { message: "Error registering user.", error };
            };
        }
    }

}