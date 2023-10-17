import fastify from "fastify";
import { env } from "./env";
import { routes } from "./app/routes";

const app = fastify()

app.register(routes)

app.listen({
  host: '0.0.0.0',
  port: env.RUN_PORT
}).then(() => {
  console.log(`server Running on port ${env.RUN_PORT}`)
})