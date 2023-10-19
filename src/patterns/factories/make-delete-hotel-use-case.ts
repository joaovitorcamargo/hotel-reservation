import { PrismaHotelRepository } from "../repositories/prisma/prisma-hotel-repository";
import { DeleteHotelUseCase } from "@/use-cases/hotel/delete-hotel";

export function makeDeleteHotelUseCase() {
  const hotelRepository = new PrismaHotelRepository()
  const deleteUseCase = new DeleteHotelUseCase(hotelRepository)

  return deleteUseCase
}