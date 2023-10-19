import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, z } from 'zod';

const reserveBodySchema = z.object({
  userId: z.string().uuid(),
  hotelId: z.string().uuid(),
  start_date: z.string().transform((str) => new Date(str)),
  end_date: z.string().transform((str) => new Date(str)),
});

export function validateReserve(
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
      reserveBodySchema.parse(request.body);
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
