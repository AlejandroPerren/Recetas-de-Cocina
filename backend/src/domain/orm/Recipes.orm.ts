
//interface of IRecipe
import { IRecipes } from "../interfaces/IRecipe.interface";

//entity of recipes
import { recipeEntity } from "../entities/Recipe.entity";
import { LogError, LogSuccess } from "../../utils/logger";

/**
 * Method to obtain all Recipes from Collerction "Recipes"
 */

//instance of entity
const recipeModel = recipeEntity();

export const getAllRecipes = async (): Promise<any> =>{
    try {
        //Search All Recipes
        return await recipeModel.find({});
    }
    catch (error) {
        LogError(`[ORM ERROR]: Getting All Recipes: ${error}`);
    }
}

export const getRecipeById = async(_id: string): Promise<any> =>{
    try {
        return await recipeModel.findById({_id})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting Recipe: ${error}`);
    }
}

export const createRecipe = async(recipe: IRecipes): Promise<any | undefined> =>{
    try {
        //Create / Insert new Recipe
        return await recipeModel.create(recipe)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Recipes ${error}`)
    }
}

export const updateRecipe = async (_id: string, updatedData: Partial<IRecipes>): Promise<any> => {
    try {
        return await recipeModel.findByIdAndUpdate(_id, updatedData, { new: true });
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Recipe ${error}`);
        throw error;
    }
};


export const deleteRecipe = async (_id: string): Promise<any | undefined> => {
    try {
        return await recipeModel.deleteOne({ _id });
    } catch (error) {
        LogError(`[ORM ERROR]: Delete Recipes ${error}`);
    }
};

export const getAllRecipesByUser = async (userId: string): Promise<any[]> => {
    try {
        const recipes = await recipeModel.find({ createdBy: userId });
        LogSuccess(`[ORM]: Found recipes for user ${userId}: ${JSON.stringify(recipes)}`);
        return recipes;
    } catch (error) {
        LogError(`[ORM ERROR]: Fetching recipes for user ${userId}: ${error}`);
        throw error;
    }
};