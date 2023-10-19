import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryReserveRepository } from '@/repositories/memory-repository/in-memory-reserve-repository';
import { ReserveHotelUseCase } from '@/use-cases/user/reserve-hotel';
import { InMemoryHotelRepository } from '@/repositories/memory-repository/in-memory-hotel-repository';
import { InMemoryUsersRepository } from '@/repositories/memory-repository/in-memory-user-repository';
import { UserNotFound } from '@/use-cases/error/user-not-found-error';
import { randomUUID } from 'crypto';
import { HotelNotFound } from '@/use-cases/error/hotel-not-found-error';

let reserveRepository: InMemoryReserveRepository;
let hotelRepository: InMemoryHotelRepository;
let userRepository: InMemoryUsersRepository;
let sut: ReserveHotelUseCase;

describe('Reserve Hotel Use Case', () => {
  beforeEach(() => {
    reserveRepository = new InMemoryReserveRepository();
    hotelRepository = new InMemoryHotelRepository();
    userRepository = new InMemoryUsersRepository();
    sut = new ReserveHotelUseCase(
      reserveRepository,
      hotelRepository,
      userRepository,
    );
  });
  it('should be able to reserve', async () => {
    const user = await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    const hotel = await hotelRepository.create({
      name: 'Empresa Teste',
      cnpj: '44346811000114',
      description: 'Descrição da empresa teste',
      email: `email@empresateste.com`,
      vacancies: 3,
      latitude: -23.5197786,
      longitude: -47.4784739,
    });

    const { reservation } = await sut.execute({
      userId: user.id,
      hotelId: hotel.id,
      start_date: new Date(),
      end_date: new Date('19/11/2024'),
    });

    expect(reservation.id).toEqual(expect.any(String));
  });

  it('should not be able to reserve not found User', async () => {
    await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

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
        userId: randomUUID(),
        hotelId: randomUUID(),
        start_date: new Date(),
        end_date: new Date('19/11/2024'),
      }),
    ).rejects.toBeInstanceOf(HotelNotFound);
  });

  it('should not be able to reserve not found Hotel', async () => {
    await userRepository.create({
      name: 'João Vitor Camargo',
      email: `email@localteste.com`,
      cpf: '35388371047',
    });

    const hotel = await hotelRepository.create({
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
        userId: randomUUID(),
        hotelId: hotel.id,
        start_date: new Date(),
        end_date: new Date('19/11/2024'),
      }),
    ).rejects.toBeInstanceOf(UserNotFound);
  });
});
