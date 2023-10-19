import { PrismaHotelRepository } from '../repositories/prisma/prisma-hotel-repository';
import { RegisterHotelUseCase } from '@/use-cases/hotel/register-hotel';

export function makeRegisterHotelUseCase(): RegisterHotelUseCase {
  const hotelRepository = new PrismaHotelRepository();
  const registerUseCase = new RegisterHotelUseCase(hotelRepository);

  return registerUseCase;
}
