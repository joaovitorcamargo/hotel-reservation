import { InMemoryUsersRepository } from '@/patterns/repositories/memory-repository/in-memory-user-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserDataUseCase } from '../../user/get-user-data';
import { UserNotFound } from '../../error/user-not-found-error';

let userRepository: InMemoryUsersRepository;
let sut: GetUserDataUseCase;

describe('Get User Data Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserDataUseCase(userRepository);
  });
  it('should be able to search for a user by an id', async () => {
    const { id } = await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    const { user } = await sut.execute({ id });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be able to generate a user not found error', async () => {
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
