import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UpdateUserDataUseCase } from '@/use-cases/user/update-user-data';

export function makeUpdateUserUseCase(): UpdateUserDataUseCase {
  const userRepository = new PrismaUserRepository();
  const updateUseCase = new UpdateUserDataUseCase(userRepository);

  return updateUseCase;
}
