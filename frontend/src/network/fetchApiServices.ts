import SummaryApi from "../common/SummaryApi";
import { ApiError, ConflictError } from "../errors/http_errors";
import { ILogin, ISignUp } from "../models/AuthModel";

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

  // Verifica si `data.message` es un array
  if (Array.isArray(data.message)) {
      return data.message; // Devuelve el array de recetas.
  }

  throw new Error("La estructura de la respuesta del servidor no es válida.");
}



