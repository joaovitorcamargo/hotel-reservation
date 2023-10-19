import { InMemoryUsersRepository } from '@/repositories/memory-repository/in-memory-user-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { UserAlreadyExists } from '../../error/user-already-exists-error';
import { UpdateUserDataUseCase } from '../../user/update-user-data';
import { UserNotFound } from '../../error/user-not-found-error';

let userRepository: InMemoryUsersRepository;
let sut: UpdateUserDataUseCase;

describe('Update User Data Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new UpdateUserDataUseCase(userRepository);
  });
  it('should be able to update', async () => {
    const createdUser = await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    const user = await sut.execute({
      id: createdUser.id,
      name: 'João Updated',
      email: `email@updated.com`,
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: 'João Updated',
        email: `email@updated.com`,
      }),
    );
  });
  it('should not be able to update when exists email', async () => {
    const createdUser = await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    await expect(() =>
      sut.execute({
        id: createdUser.id,
        name: 'João Updated',
        email: `email@localteste.com`,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });

  it('should not be able to update not exist user', async () => {
    await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    await expect(() =>
      sut.execute({
        id: 'any-id',
        name: 'João Updated',
        email: `email@updated.com`,
      }),
    ).rejects.toBeInstanceOf(UserNotFound);
  });
});
