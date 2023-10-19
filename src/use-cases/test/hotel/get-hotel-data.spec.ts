import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryHotelRepository } from "@/patterns/repositories/memory-repository/in-memory-hotel-repository";
import { GetHotelDataUseCase } from "@/use-cases/hotel/get-hotel-data";
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';

let hotelRepository: InMemoryHotelRepository
let sut: GetHotelDataUseCase

describe('Get Hotel Data Use Case', () => {
  beforeEach(() => {
    hotelRepository = new InMemoryHotelRepository()
    sut = new GetHotelDataUseCase(hotelRepository)
  })
  it('should be able to search for a hotel by an id', async () => {
   const {id} = await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739
    })

    const { hotel } = await sut.execute({id})

    expect(hotel.id).toEqual(expect.any(String))
  })

  it('should be able to get a hotel not found error', async () => {
    await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739
     })
 
     await expect(() => sut.execute({id: 'any-id'})).rejects.toBeInstanceOf(HotelNotFound)
   })
})