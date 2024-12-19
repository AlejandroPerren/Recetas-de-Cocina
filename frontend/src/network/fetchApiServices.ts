import SummaryApi from "../common/SummaryApi";
import { ApiError } from "../errors/http_errors";
import { ILogin, ISignUp } from "../models/AuthModel";
import { ICreateRecipe } from "../models/ServicesModel";
import { RootState } from '../redux/store';

// Reusable function body for requests
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMessage = errorBody?.error || "Error desconocido";
    throw new ApiError(response.status, errorMessage);
  }
  return response.json();
}

// SignUp
export async function SignUp(user: ISignUp): Promise<any> {
  return fetchData(SummaryApi.SignUp.url, {
    method: SummaryApi.SignUp.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

// Login
export async function Login(auth: ILogin): Promise<any> {
  return fetchData(SummaryApi.Login.url, {
    method: SummaryApi.Login.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(auth),
  });
}

// Recipes
export async function GetAllRecipes(): Promise<any> {
  const data = await fetchData(SummaryApi.GetAllRecipes.url, {
    method: SummaryApi.GetAllRecipes.method,
  });

  if (Array.isArray(data.message)) {
    return data.message;
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}

export async function GetRecipeById(id: any) {
  return await fetchData(`${SummaryApi.GetAllRecipes.url}/${id}`, {
    method: SummaryApi.GetAllRecipes.method,
  });
}

export async function CreateNewRecipe(recipe: ICreateRecipe, getState: () => RootState): Promise<any> {
  // Obtén el token del estado global (store)
  const token = getState().auth.token;

  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  return fetchData(SummaryApi.CreateNewRecipe.url, {
    method: SummaryApi.CreateNewRecipe.method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Añade el token en los headers
    },
    body: JSON.stringify(recipe),
  });
}


export async function UpdateRecipe(recipe: ICreateRecipe, id: string): Promise<any> {
  return fetchData(`${SummaryApi.UpdateRecipe.url}/${id}`, {
    method: SummaryApi.UpdateRecipe.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
}

export async function GetRecipesByUserId(userId: string): Promise<any> {
  return fetchData(`${SummaryApi.GetRecipesByUserId.url}/${userId}`, {
    method: SummaryApi.GetRecipesByUserId.method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Users
export async function GetUserById(userId: string): Promise<any> {
  return fetchData(`${SummaryApi.GetUserById.url}/${userId}`, {
    method: SummaryApi.GetUserById.method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
