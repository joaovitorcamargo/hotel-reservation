import { validateGetUser } from "@/patterns/decorators/validateGetUser";
import { makeGetDataUserUserUseCase } from "@/patterns/factories/make-get-data-user-use-case";
import { UserNotFound } from "@/use-cases/error/user-not-found-error";
import { FastifyRequest, FastifyReply } from "fastify";

interface GetDataRequest {
  id: string
}

export class GetData {
  private static getDataUseCase = makeGetDataUserUserUseCase()

  @validateGetUser
  static async run(request: FastifyRequest<{ Params: GetDataRequest }>, reply: FastifyReply) { 
    try {
      const {user} = await GetData.getDataUseCase.execute(request.params)
      
      return reply.status(200).send({
        user
      })
    }catch(error) {
      if(error instanceof UserNotFound) {
        return reply.status(404).send({
          message: error.message
        })
      }
      throw error
    }
  }
}