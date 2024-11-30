/*
Root Router He takes care of the requests
*/
import express from "express";
//Routes
import authRouter from "./AuthRoutes";
import userRouter from "./UserRoutes";
import recipesRouter from "./RecipesRoutes";

//Instance of server
const server = express();

// intance of router
const rootRouter = express.Router();

//Redirec
server.use("/", rootRouter); // http://localhost:8080/api/

//Auth Routes
server.use("/auth", authRouter); // http://localhost:8080/api/auth  -->  authRouter

//Users Router
server.use("/users", userRouter); // http://localhost:8080/api/users  -->  userRouter

//Recipes Router
server.use("/recipes", recipesRouter) //http://localhost:8080/api/recipes  -->  recipesRouter

export default server;