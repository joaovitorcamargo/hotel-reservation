import { UserRepository } from '@/patterns/repositories/user-repository';
import { UserAlreadyExists } from '../error/user-already-exists-error';
import { UserNotFound } from '../error/user-not-found-error';
import { User } from '@prisma/client';

interface UpdateUserDataUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
}

export class UpdateUserDataUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: UpdateUserDataUseCaseRequest): Promise<User | null> {
    const userAlreadyExists = await this.userRepository.findUserByEmailOrCpf(
      data.email,
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const userIsFounded = await this.userRepository.findUserById(data.id);

    if (!userIsFounded) {
      throw new UserNotFound();
    }

    const user = await this.userRepository.update(data.id, data);

    return user;
  }
}
