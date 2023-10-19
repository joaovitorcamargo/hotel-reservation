import { PrismaHotelRepository } from "../repositories/prisma/prisma-hotel-repository";
import { RegisterHotelUseCase } from "@/use-cases/hotel/register-hotel";

export function makeRegisterHotelUseCase() {
  const hotelRepository = new PrismaHotelRepository()
  RegisterHotelUseCase
  const registerUseCase = new RegisterHotelUseCase(hotelRepository)

  return registerUseCase
}