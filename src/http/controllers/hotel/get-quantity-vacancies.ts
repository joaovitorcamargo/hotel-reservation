import { validateGetWithUuid } from '@/decorators/validateGetWithUuid';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetQuantityVacanciesUseCase } from '@/factories/make-get-quantity-vacancies-use-case';

interface GetQuantityVacanciesRequest {
  id: string;
}

export class GetQuantityVacancies {
  private static getQuantityVacancies = makeGetQuantityVacanciesUseCase();

  @validateGetWithUuid
  static async run(
    request: FastifyRequest<{ Params: GetQuantityVacanciesRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { total } = await GetQuantityVacancies.getQuantityVacancies.execute(
        request.params,
      );

      return reply.status(200).send({
        total_vacancies_remaining: total,
      });
    } catch (error) {
      if (error instanceof HotelNotFound) {
        return reply.status(404).send({
          message: error.message,
        });
      }
      throw error;
    }
  }
}
