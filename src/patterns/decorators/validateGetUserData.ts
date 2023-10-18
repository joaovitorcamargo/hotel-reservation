import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";

const getDataBodySchema = z.object({
  id: z.string().uuid()
});

export function validateGetUserData(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      getDataBodySchema.parse(request.params);
      await originalMethod.call(this, request, reply);
    } catch (error) {
      if(error instanceof ZodError) {
        reply.status(400).send({
          message: "Usuário pesquisado inválido.",
          errors: error.message,
        });
      }
    }
  };
}