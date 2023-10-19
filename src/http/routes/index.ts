import { FastifyInstance } from "fastify";
import { Register } from "../controllers/user/register.controller";
import { GetData } from "../controllers/user/get-data.controller";
import { Update } from "../controllers/user/update.controller";
import { Delete } from "../controllers/user/delete.controller";
import { Register as RegisterHotel } from "../controllers/hotel/register.controller";
import { Update as UpdateHotel } from "../controllers/hotel/update.controller";

export async function routes(app: FastifyInstance) {
    app.get('/user/:id', GetData.run)
    app.post('/user', Register.run)
    app.patch('/user/:id', Update.run)
    app.delete('/user/:id', Delete.run)

    app.post('/hotel', RegisterHotel.run)
    app.patch('/hotel/:id', UpdateHotel.run)
}