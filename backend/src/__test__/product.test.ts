import supertest from "supertest"
import server from "../server/index"
import dotenv from "dotenv"



dotenv.config();

describe("GET / api/users",()=>{
    it("Devuelve todos los usuarios", async ()=>{
        return supertest(server)
        .get("/api/users")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.statusCode).toBe(200);
        })
    })
})

