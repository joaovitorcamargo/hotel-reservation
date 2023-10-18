import { makeRegisterUserUseCase } from "@/factories/make-register-user-use-case";
import { UserAlreadyExists } from "@/use-cases/error/user-already-exists-error";
import { FastifyRequest, FastifyReply } from "fastify";
import {z} from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const cpfWithoutSymbols = /^[^.\\-]*$/

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().regex(cpfWithoutSymbols).max(11)
  })

  const {name, email, cpf} = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUserUseCase()

    await registerUseCase.execute({
      name,
      email,
      cpf
    })
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