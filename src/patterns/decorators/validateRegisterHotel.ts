import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, z } from 'zod';

const registerBodySchema = z.object({
  name: z.string(),
  description: z.string().default(''),
  cnpj: z.string(),
  email: z.string().email(),
  vacancies: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});

export function validateRegisterHotel(
  _: unknown,
  __: string,
  descriptor: PropertyDescriptor,
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      registerBodySchema.parse(request.body);
      await originalMethod.call(this, request, reply);
    } catch (error) {
      if (error instanceof ZodError) {
        reply.status(400).send({
          message: 'Dados de solicitação inválidos',
          errors: error.message,
        });
      }
    }
  };
}
