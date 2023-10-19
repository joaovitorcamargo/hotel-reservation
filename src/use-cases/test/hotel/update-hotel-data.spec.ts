import { expect, describe, it, beforeEach } from 'vitest';
import { UpdateHotelDataUseCase } from '@/use-cases/hotel/update-hotel-data';
import { InMemoryHotelRepository } from '@/repositories/memory-repository/in-memory-hotel-repository';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';

let hotelRepository: InMemoryHotelRepository;
let sut: UpdateHotelDataUseCase;

describe('Update Hotel Data Use Case', () => {
  beforeEach(() => {
    hotelRepository = new InMemoryHotelRepository();
    sut = new UpdateHotelDataUseCase(hotelRepository);
  });
  it('should be able to update', async () => {
    const createdHotel = await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739,
    });

    const hotel = await sut.execute({
      id: createdHotel.id,
      name: 'Empresa Teste Updated',
      description: 'Descrição da empresa teste updated',
      email: `email@empresatesteupdated.com`,
    });

    expect(hotel).toEqual(
      expect.objectContaining({
        name: 'Empresa Teste Updated',
        email: `email@empresatesteupdated.com`,
        description: 'Descrição da empresa teste updated',
      }),
    );
  });

  it('should not be able to update not exist hotel', async () => {
    await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739,
    });

    await expect(() =>
      sut.execute({
        id: 'any-id',
        name: 'João Updated',
        email: `email@updated.com`,
        description: 'Descrição da empresa teste updated',
      }),
    ).rejects.toBeInstanceOf(HotelNotFound);
  });
});
