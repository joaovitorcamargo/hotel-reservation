import { FastifyInstance } from "fastify";
import { register } from "../controllers/user/register.controller";

export async function routes(app: FastifyInstance) {
    app.post('/user', register)
}