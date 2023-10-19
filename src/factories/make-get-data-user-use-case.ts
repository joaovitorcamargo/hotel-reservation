import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserDataUseCase } from '@/use-cases/user/get-user-data';

export function makeGetDataUserUserUseCase(): GetUserDataUseCase {
  const userRepository = new PrismaUserRepository();
  const getDataUseCase = new GetUserDataUseCase(userRepository);

  return getDataUseCase;
}
