import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryHotelRepository } from '@/repositories/memory-repository/in-memory-hotel-repository';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';
import { GetQuantityVacanciesDataUseCase } from '@/use-cases/hotel/get-quantity-vacancies';
import { InMemoryReserveRepository } from '@/repositories/memory-repository/in-memory-reserve-repository';

let hotelRepository: InMemoryHotelRepository;
let reservationRepository: InMemoryReserveRepository;
let sut: GetQuantityVacanciesDataUseCase;

describe('Get Quantity Vacancies Data Use Case', () => {
  beforeEach(() => {
    hotelRepository = new InMemoryHotelRepository();
    reservationRepository = new InMemoryReserveRepository();
    sut = new GetQuantityVacanciesDataUseCase(
      hotelRepository,
      reservationRepository,
    );
  });
  it('should be able to get vacancies', async () => {
    const { id } = await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739,
    });

    const { total } = await sut.execute({ id });

    expect(total).toEqual(expect.any(Number));
  });

  it('should be able to get a vacancie if hotel not found error', async () => {
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
