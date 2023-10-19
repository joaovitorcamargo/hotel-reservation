import { UserRepository } from '@/repositories/user-repository';
import { UserNotFound } from '../error/user-not-found-error';
import { User } from '@prisma/client';

interface DeleteUserUseCaseRequest {
  id: string;
}

interface DeleteUserUseCaseResponse {
  users: User[];
}

export class DeleteUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const userIsFounded = await this.userRepository.findUserById(id);

    if (!userIsFounded) {
      throw new UserNotFound();
    }

    const users = await this.userRepository.delete(id);

    return { users };
  }
}
