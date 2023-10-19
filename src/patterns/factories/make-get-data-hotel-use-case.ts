import { PrismaHotelRepository } from '../repositories/prisma/prisma-hotel-repository';
import { GetHotelDataUseCase } from '@/use-cases/hotel/get-hotel-data';

export function makeGetDataHotelUseCase(): GetHotelDataUseCase {
  const hotelRepository = new PrismaHotelRepository();
  const getDataUseCase = new GetHotelDataUseCase(hotelRepository);

  return getDataUseCase;
}
