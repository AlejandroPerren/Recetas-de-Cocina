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


