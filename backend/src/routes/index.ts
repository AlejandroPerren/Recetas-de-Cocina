/*
Root Router He takes care of the requests

*/
import express,{Request, Response} from "express";
//Authentication Routes
import authRouter from "./AuthRoutes";

//Instance of server
const server = express();

// intance of router
const rootRouter = express.Router();

//Redirec
server.use("/", rootRouter); // http://localhost:8080/api/

//Auth Routes
server.use("/auth", authRouter); // http://localhost:8080/api/auth  -->  authRouter

export default server;