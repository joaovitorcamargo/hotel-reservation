import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { DeleteUserUseCase } from '@/use-cases/user/delete-user';

export function makeDeleteUserUseCase(): DeleteUserUseCase {
  const userRepository = new PrismaUserRepository();
  const deleteUseCase = new DeleteUserUseCase(userRepository);

  return deleteUseCase;
}
