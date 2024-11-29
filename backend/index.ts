//Server Settings
import server from "./src/server";

//env
import dotenv from "dotenv";

//MongoDB
import mongoose from "mongoose";
import { LogError } from "./src/utils/logger";

//ENV CONFIG 
dotenv.config();



const MONGO_CONNECTION: any  = process.env.MONGO_CONNECTION;
const PORT: string | number = process.env.PORT || 4000;


mongoose.connect(MONGO_CONNECTION)
    .then(()=> {
        console.log("Connected to Mongoose server");
        server.listen(PORT, ()=> {
            console.log(`Server listen in http://localhost:8080`);
        });
    })
    .catch(console.error);

server.on('error',(error)=>{
    LogError(`[SERVER ERROR]: ${error}`)
})