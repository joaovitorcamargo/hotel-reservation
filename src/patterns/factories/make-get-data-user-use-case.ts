import { PrismaUserRepository } from "@/patterns/repositories/prisma/prisma-user-repository";
import { GetUserDataUseCase } from "@/use-cases/user/get-user-data";

export function makeGetDataUserUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const getDataUseCase = new GetUserDataUseCase(userRepository)

  return getDataUseCase
}