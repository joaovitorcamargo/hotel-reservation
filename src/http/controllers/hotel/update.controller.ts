import { validateUpdateHotel } from "@/patterns/decorators/validateUpdateHotel";
import { makeUpdateHotelUseCase } from "@/patterns/factories/make-update-hotel-use-case";
import { HotelNotFound } from "@/use-cases/error/hotel-not-found-error";
import { FastifyRequest, FastifyReply } from "fastify";

interface UpdateRequestBody {
  name?: string
  email?: string
  description?: string
}

interface UpdateRequestParams {
  id: string
}

export class Update {
  private static updateHotelUseCase = makeUpdateHotelUseCase()

  @validateUpdateHotel
  static async run(request: FastifyRequest<{ Body: UpdateRequestBody, Params: UpdateRequestParams }>, reply: FastifyReply) { 
    try {
      const data = {
        ...request.body,
        ...request.params
      }
      
      await Update.updateHotelUseCase.execute(data)
    }catch(error) {
      if(error instanceof HotelNotFound) {
        return reply.status(409).send({
          message: error.message
        })
      }
      throw error
    }
    return reply.status(200).send()
  }
}