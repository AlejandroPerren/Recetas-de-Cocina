//express
import express, {Express, Request, Response} from "express"

//ENV
import dotenv from "dotenv"

//Swagger
import swaggerUi from "swagger-ui-express";

//Security 
import cors from "cors";
import helmet from "helmet";

//Root Router
import router from "../routes"



//express Config
const server: Express = express();
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({extended: true, limit: '50m'}))

//ENV CONFIG 
dotenv.config()

//Security Config
server.use(helmet());
server.use(cors());

//Static Server
server.use(express.static('public'));


//swagger config route
server.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined,{
    swaggerOptions: {
        url: "/swagger.json",
        explorer: true
    }
}));

//server in /api
server.use("/api", router);

//alwais api redirect
server.get("/",(req: Request, res: Response)=>{
    res.redirect("/api")
});


export default server;

