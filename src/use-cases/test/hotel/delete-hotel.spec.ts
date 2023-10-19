import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryHotelRepository } from '@/patterns/repositories/memory-repository/in-memory-hotel-repository';
import { DeleteHotelUseCase } from '@/use-cases/hotel/delete-hotel';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';

let hotelRepository: InMemoryHotelRepository;
let sut: DeleteHotelUseCase;

describe('Delete Hotel Data Use Case', () => {
  beforeEach(() => {
    hotelRepository = new InMemoryHotelRepository();
    sut = new DeleteHotelUseCase(hotelRepository);
  });
  it('should be able to delete hotel', async () => {
    const createdHotel = await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739,
    });

    const { hotels } = await sut.execute({ id: createdHotel.id });

    expect(hotels).toEqual([]);
  });

  it('should not be able to delete hotel with not exist id', async () => {
    await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739,
    });

    await expect(() => sut.execute({ id: 'any-id' })).rejects.toBeInstanceOf(
      HotelNotFound,
    );
  });
});
