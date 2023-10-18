import { UserRepository } from "@/repositories/user-repository"
import { User } from "@prisma/client"
import { UserAlreadyExists } from "../error/user-already-exists-error"

interface RegisterUseCaseRequest {
  name: string
  cpf: string
  email: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute({
    name,
    cpf,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const userAlreadyExists = await this.userRepository.findUserByEmailOrCpf(email, cpf)

    if(userAlreadyExists) {
      throw new UserAlreadyExists()
    }

    const user = await this.userRepository.create({
      name,
      email,
      cpf
    })
    
    return {
      user,
    }
  }
  
}