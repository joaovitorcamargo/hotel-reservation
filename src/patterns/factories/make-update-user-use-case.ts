import { PrismaUserRepository } from "@/patterns/repositories/prisma/prisma-user-repository";
import { UpdateUserDataUseCase } from "@/use-cases/user/update-user-data";

export function makeUpdateUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const registerUseCase = new UpdateUserDataUseCase(userRepository)

  return registerUseCase
}