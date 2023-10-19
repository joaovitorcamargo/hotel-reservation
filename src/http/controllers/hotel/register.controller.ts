import { validateRegisterHotel } from '@/patterns/decorators/validateRegisterHotel';
import { makeRegisterHotelUseCase } from '@/patterns/factories/make-register-hotel-use-case';
import { HotelAlreadyExists } from '@/use-cases/error/hotel-already-exists-error';
import { FastifyRequest, FastifyReply } from 'fastify';

interface RegisterRequest {
  name: string;
  description: string | null;
  cnpj: string;
  email: string;
  vacancies: number;
  latitude: number;
  longitude: number;
}

export class Register {
  private static registerUseCase = makeRegisterHotelUseCase();

  @validateRegisterHotel
  static async run(
    request: FastifyRequest<{ Body: RegisterRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      await Register.registerUseCase.execute(request.body);
    } catch (error) {
      if (error instanceof HotelAlreadyExists) {
        return reply.status(409).send({
          message: error.message,
        });
      }
      throw error;
    }
    return reply.status(201).send();
  }
}
