import { InMemoryUsersRepository } from '@/patterns/repositories/memory-repository/in-memory-user-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { UserNotFound } from '../../error/user-not-found-error';
import { DeleteUserUseCase } from '../../user/delete-user';

let userRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Data Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(userRepository);
  });
  it('should be able to delete user', async () => {
    const createdUser = await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    const { users } = await sut.execute({ id: createdUser.id });

    expect(users).toEqual([]);
  });

  it('should not be able to delete user with not exist id', async () => {
    await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    await expect(() => sut.execute({ id: 'any-id' })).rejects.toBeInstanceOf(
      UserNotFound,
    );
  });
});
