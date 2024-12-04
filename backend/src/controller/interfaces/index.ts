import { IRecipes } from "../../domain/interfaces/IRecipe.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";


export interface IUserController {
    //Get all users
    getAllUsers(): Promise<any>

}

export interface IAuthController {
    //register Users
    registerUser(user: IUser): Promise<any>

}

export interface IRecipeController {
    // Get All Recipes
    getAllRecipes(): Promise<any>;

    // Get Recipe By ID
    getRecipeById(_id: string): Promise<any>;

    // Create Recipe
    createRecipe(recipe: IRecipes): Promise<any>;

    // Update Recipe
    updateRecipe(recipe: Partial<IRecipes>, recipeId: string): Promise<any>;

    // Delete Recipe
    deleteRecipe(_id: string): Promise<any>;
}
