import { FastifyInstance } from "fastify";
import { Register } from "../controllers/user/register.controller";

export async function routes(app: FastifyInstance) {
    app.post('/user', Register.run)
}