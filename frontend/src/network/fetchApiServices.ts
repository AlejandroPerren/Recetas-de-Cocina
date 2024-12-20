import SummaryApi from "../common/SummaryApi";
import { ApiError } from "../errors/http_errors";
import { ILogin, ISignUp } from "../models/AuthModel";
import { ICreateRecipe } from "../models/ServicesModel";
import store from "../redux/store";

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
function getToken() {
  const token = store.getState().auth.token;
  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }
  return token;
}


const commonHeaders = {
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
};


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

export async function CreateNewRecipe(recipe: ICreateRecipe): Promise<any> {
  const response = await fetch(SummaryApi.CreateNewRecipe.url, {
    method: SummaryApi.CreateNewRecipe.method,
    headers: commonHeaders,
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new ApiError(response.status, "Error al crear receta");
  }

  return response.json();
}


export async function UpdateRecipe(recipe: ICreateRecipe, id: string): Promise<any> {
  return fetchData(`${SummaryApi.UpdateRecipe.url}/${id}`, {
    method: SummaryApi.UpdateRecipe.method,
    headers: commonHeaders,
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
