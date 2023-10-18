import { validateRegisterUser } from "@/decorators/validateRegisterUser";
import { makeRegisterUserUseCase } from "@/factories/make-register-user-use-case";
import { UserAlreadyExists } from "@/use-cases/error/user-already-exists-error";
import { FastifyRequest, FastifyReply } from "fastify";

interface RegisterRequest {
  name: string
  email: string
  cpf: string
}

export class Register {
  private static registerUseCase = makeRegisterUserUseCase()

  @validateRegisterUser
  static async run(request: FastifyRequest<{ Body: RegisterRequest }>, reply: FastifyReply) { 
    try {
      await Register.registerUseCase.execute(request.body)
    }catch(error) {
      if(error instanceof UserAlreadyExists) {
        return reply.status(409).send({
          message: error.message
        })
      }
      throw error
    }
    return reply.status(201).send()
  }
}