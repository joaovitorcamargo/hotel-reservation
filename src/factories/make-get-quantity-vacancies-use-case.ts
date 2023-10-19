import { PrismaHotelRepository } from '../repositories/prisma/prisma-hotel-repository';
import { PrismaReservationRepository } from '../repositories/prisma/prisma-reservation-repository';
import { GetQuantityVacanciesDataUseCase } from '@/use-cases/hotel/get-quantity-vacancies';

export function makeGetQuantityVacanciesUseCase(): GetQuantityVacanciesDataUseCase {
  const reservationRepository = new PrismaReservationRepository();
  const hotelRepository = new PrismaHotelRepository();

  const registerUseCase = new GetQuantityVacanciesDataUseCase(
    hotelRepository,
    reservationRepository,
  );

  return registerUseCase;
}
