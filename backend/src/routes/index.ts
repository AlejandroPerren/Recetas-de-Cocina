/*
Root Router He takes care of the requests

*/
import express from "express";
//Authentication Routes
import authRouter from "./AuthRoutes";
import userRouter from "./UserRoutes";

//Instance of server
const server = express();

// intance of router
const rootRouter = express.Router();

//Redirec
server.use("/", rootRouter); // http://localhost:8080/api/

//Auth Routes
server.use("/auth", authRouter); // http://localhost:8080/api/auth  -->  authRouter

//Users Router
server.use("/users", userRouter);

export default server;