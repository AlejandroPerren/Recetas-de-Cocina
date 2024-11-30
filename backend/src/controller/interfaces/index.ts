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

export interface IRecipeController{
    //get all recipes
    getAllRecipes(): Promise<any>

    //Create Recipe
    createRecipe(recipe: IRecipes):Promise<any>
}