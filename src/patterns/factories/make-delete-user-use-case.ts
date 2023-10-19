import { PrismaUserRepository } from "@/patterns/repositories/prisma/prisma-user-repository";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user";

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const deleteUseCase = new DeleteUserUseCase(userRepository)

  return deleteUseCase
}