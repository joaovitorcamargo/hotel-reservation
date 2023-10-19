import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterHotelUseCase } from "@/use-cases/hotel/register-hotel";
import { InMemoryHotelRepository } from "@/patterns/repositories/memory-repository/in-memory-hotel-repository";
import { HotelAlreadyExists } from '@/use-cases/error/hotel-already-exists-error';

let hotelRepository: InMemoryHotelRepository
let sut: RegisterHotelUseCase

describe('Register Hotel Use Case', () => {
  beforeEach(() => {
    hotelRepository = new InMemoryHotelRepository()
    sut = new RegisterHotelUseCase(hotelRepository)
  })
  it('should be able to register hotel', async () => {
    const { hotel } = await sut.execute({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739
    })

    expect(hotel.id).toEqual(expect.any(String))
  })
  
  it('should be able to give error with repeated cnpj', async () => {
    await sut.execute({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739
    })

    await expect(() => sut.execute({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739
    })).rejects.toBeInstanceOf(HotelAlreadyExists)
  })
})