import SummaryApi from "../common/SummaryApi";
import { ApiError } from "../errors/http_errors";
import { ILogin, ISignUp } from "../models/AuthModel";
import { ICreateRecipe } from "../models/ServicesModel";

//Reusable function body for requests
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage = errorBody?.error || "Error desconocido";
        throw new ApiError(response.status, errorMessage);
      }
    
      return response.json();
}
//SignUp
export async function SignUp(user: ISignUp): Promise<any> {
    return fetchData(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
}

//login
export async function Login(auth: ILogin): Promise<any> {
    return fetchData(SummaryApi.Login.url, {
        method: SummaryApi.Login.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });
}

//Recipes
//All Recipes
export async function GetAllRecipes(): Promise<any> {
  const data = await fetchData(SummaryApi.GetAllRecipes.url, {
      method: SummaryApi.GetAllRecipes.method,
  });

  if (Array.isArray(data.message)) {
      return data.message;
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}
export async function CreateNewRecipe(recipe: ICreateRecipe): Promise<any> {
  return fetchData(SummaryApi.CreateNewRecipe.url, {
      method: SummaryApi.CreateNewRecipe.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
}


