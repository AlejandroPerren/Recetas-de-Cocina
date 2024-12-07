import { IRecipes } from "../../domain/interfaces/IRecipe.interface";
import { IAuth, IUser } from "../../domain/interfaces/IUser.interface";


export interface IUserController {
    //Get all users
    getAllUsers(): Promise<any>

    //get one User By id()
    getUserById(_id: string): Promise<any>;

    //Update User
    updateUser(user: Partial<IUser>, userId: string):Promise<any>

    //Delete User
    deleteUser():Promise<any>

}

export interface IAuthController {
    //register Users
    registerUser(user: IUser): Promise<any>;

    //LOGIN
    login(auth: IAuth): Promise<any>;
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
