import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { ReserveHotelUseCase } from '@/use-cases/user/reserve-hotel';
import { PrismaHotelRepository } from '../repositories/prisma/prisma-hotel-repository';
import { PrismaReservationRepository } from '../repositories/prisma/prisma-reservation-repository';

export function makeReservationUseCase(): ReserveHotelUseCase {
  const reservationRepository = new PrismaReservationRepository();
  const hotelRepository = new PrismaHotelRepository();
  const userRepository = new PrismaUserRepository();

  const registerUseCase = new ReserveHotelUseCase(
    reservationRepository,
    hotelRepository,
    userRepository,
  );

  return registerUseCase;
}
