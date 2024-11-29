import SummaryApi from "../common/SummaryApi";
import { ConflictError } from "../errors/http_errors";
import { ISignUp } from "../models/AuthModel";

//Reusable function body for requests
async function fetchData(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);
    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if(response.status === 409){
            throw new ConflictError(errorMessage);
        }else{
            throw Error("La Peticion Fallo.  Estado:" + response.status + "mensaje" + errorMessage)
        }
    }
}

export async function SignUp(user: ISignUp): Promise<any> {
    const response = await fetchData(SummaryApi.SignUp.url,
        {method: SummaryApi.SignUp.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        return response.json();
}

