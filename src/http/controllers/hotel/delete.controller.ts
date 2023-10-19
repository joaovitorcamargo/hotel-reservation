import { validateGetWithUuid } from "@/patterns/decorators/validateGetWithUuid";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeDeleteHotelUseCase } from "@/patterns/factories/make-delete-hotel-use-case";
import { HotelNotFound } from "@/use-cases/error/hotel-not-found-error";

interface DeleteUserRequest {
  id: string
}

export class Delete {
  private static deleteHotelUseCase = makeDeleteHotelUseCase()

  @validateGetWithUuid
  static async run(request: FastifyRequest<{ Params: DeleteUserRequest }>, reply: FastifyReply) { 
    try {
      await Delete.deleteHotelUseCase.execute(request.params)
      
      return reply.status(200).send()
    }catch(error) {
      if(error instanceof HotelNotFound) {
        return reply.status(404).send({
          message: error.message
        })
      }
      throw error
    }
  }
}