import fastify from "fastify";
import { env } from "./env";

const app = fastify()

app.listen({
  host: '0.0.0.0',
  port: env.RUN_PORT
}).then(() => {
  console.log(`server Running on port ${env.RUN_PORT}`)
})