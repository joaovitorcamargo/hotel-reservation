import { validateGetWithUuid } from '@/patterns/decorators/validateGetWithUuid';
import { makeGetDataHotelUseCase } from '@/patterns/factories/make-get-data-hotel-use-case';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';

interface GetDataRequest {
  id: string;
}

export class GetData {
  private static getDataUseCase = makeGetDataHotelUseCase();

  @validateGetWithUuid
  static async run(
    request: FastifyRequest<{ Params: GetDataRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { hotel } = await GetData.getDataUseCase.execute(request.params);

      return reply.status(200).send({
        hotel,
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
