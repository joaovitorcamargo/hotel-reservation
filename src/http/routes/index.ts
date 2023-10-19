import { FastifyInstance } from "fastify";
import { Register } from "../controllers/user/register.controller";
import { GetData } from "../controllers/user/get-data.controller";
import { Update } from "../controllers/user/update.controller";

export async function routes(app: FastifyInstance) {
    app.post('/user', Register.run)
    app.get('/user/:id', GetData.run)
    app.patch('/user/:id', Update.run)
}