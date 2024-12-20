const backendDomain: string = import.meta.env.VITE_backendDomain || "http://localhost:8080/api";  
if (!backendDomain) {
    throw new Error("La variable de entorno VITE_backendDomain no está definida.");
  }

const SummaryApi = {
    SignUp : {
        url: `${backendDomain}/auth/register`,
        method: `post`
    },
    Login: {
        url: `${backendDomain}/auth/login`,
        method: `post`
    },
    GetAllRecipes: {
        url: `${backendDomain}/recipes`,
        method: 'get'
    },
    CreateNewRecipe:{
        url: `${backendDomain}/recipes`,
        method: `post`
    },
    UpdateRecipe:{
        url: `${backendDomain}/recipes`,
        method: `put`
    },
    GetRecipesByUserId:{
        url: `${backendDomain}/recipes/user`,
        method: `get`
    },
    GetUserById:{
        url: `${backendDomain}/users`,
        method: `get`
    },
}

export default SummaryApi;