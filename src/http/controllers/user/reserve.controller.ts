import { FastifyRequest, FastifyReply } from 'fastify';
import { makeReservationUseCase } from '@/patterns/factories/make-reservation-use-case';
import { UserNotFound } from '@/use-cases/error/user-not-found-error';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';
import { validateReserve } from '@/patterns/decorators/validateReserve';
import { HotelHasNoVacancies } from '@/use-cases/error/hotel-has-no-vacancies-error';

interface ReserveRequest {
  userId: string;
  hotelId: string;
  start_date: Date;
  end_date: Date;
}

export class Reserve {
  private static registerUseCase = makeReservationUseCase();

  @validateReserve
  static async run(
    request: FastifyRequest<{ Body: ReserveRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      request.body.start_date = new Date(request.body.start_date);
      request.body.end_date = new Date(request.body.end_date);
      await Reserve.registerUseCase.execute(request.body);
    } catch (error) {
      if (error instanceof UserNotFound) {
        return reply.status(409).send({
          message: error.message,
        });
      }
      if (error instanceof HotelNotFound) {
        return reply.status(409).send({
          message: error.message,
        });
      }
      if (error instanceof HotelHasNoVacancies) {
        return reply.status(409).send({
          message: error.message,
        });
      }
      throw error;
    }
    return reply.status(201).send();
  }
}
