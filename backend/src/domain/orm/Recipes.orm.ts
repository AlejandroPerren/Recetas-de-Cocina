
//interface of IRecipe
import { IRecipes } from "../interfaces/IRecipe.interface";

//entity of recipes
import { recipeEntity } from "../entities/Recipe.entity";
import { LogError } from "../../utils/logger";

/**
 * Method to obtain all Users from Collerction "users"
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

export const createRecipe = async(recipe: IRecipes): Promise<any | undefined> =>{
    try {
        //Create / Insert new Recipe
        return await recipeModel.create(recipe)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Recipes ${error}`)
    }
}

export const updateRecipe = async(recipe: IRecipes): Promise<any | undefined> => {
    try{
        return await recipeModel.findOne({_id: recipe._id});
    }catch(error){
        LogError(`[ORM ERROR]: Edite Recipes ${error}`);
    }
}

export const deleteRecipe = async(recipe: IRecipes): Promise<any | undefined> => {
 try {
    return await recipeModel.deleteOne({_id: recipe._id})
 } catch (error) {
    LogError(`[ORM ERROR]: Delete Recipes ${error}`);
 }
}
