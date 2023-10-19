import { InMemoryUsersRepository } from "@/patterns/repositories/memory-repository/in-memory-user-repository";
import { RegisterUserUseCase } from "../../user/register-user";
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExists } from "../../error/user-already-exists-error";


let userRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(userRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to give error with repeated email', async () => {
    await sut.execute({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371057'
    })

    await expect(() => sut.execute({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047'
    })).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  it('should be able to give error with repeated cpf', async () => {
    await sut.execute({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371057'
    })

    await expect(() => sut.execute({
      name: 'João Vitor Camargo',
      email: `email@localtestedois.com`,
      cpf: '35388371057'
    })).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})