import { UserRepository } from '@/patterns/repositories/user-repository';
import { User } from '@prisma/client';
import { UserNotFound } from '../error/user-not-found-error';

interface GetUserDataRequest {
  id: string;
}

interface GetUserDataResponse {
  user: User;
}

export class GetUserDataUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id }: GetUserDataRequest): Promise<GetUserDataResponse> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      user,
    };
  }
}
