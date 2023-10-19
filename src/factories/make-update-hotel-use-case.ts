import { PrismaHotelRepository } from '../repositories/prisma/prisma-hotel-repository';
import { UpdateHotelDataUseCase } from '@/use-cases/hotel/update-hotel-data';

export function makeUpdateHotelUseCase(): UpdateHotelDataUseCase {
  const hotelRepository = new PrismaHotelRepository();
  const updateUseCase = new UpdateHotelDataUseCase(hotelRepository);

  return updateUseCase;
}
