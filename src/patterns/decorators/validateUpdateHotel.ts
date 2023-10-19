import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";

const updateDataParam = z.object({
  id: z.string().uuid()
});

const updateDataBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional()
});

export function validateUpdateHotel(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      updateDataParam.parse(request.params);
      updateDataBody.parse(request.body);
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