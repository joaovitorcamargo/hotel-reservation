import { Prisma } from "@prisma/client";
import { prisma } from "@/client/prisma";
import { HotelRepository } from "../hotel-repository";

export class PrismaHotelRepository implements HotelRepository{
  async create(data: Prisma.HotelCreateInput) {
    const hotel = prisma.hotel.create({
      data
    })
    
    return hotel
  }

 async findUserByCnpj(cnpj: string){
  const hotel = prisma.hotel.findUnique({
    where: {
      cnpj
    }
  })

  return hotel
  }

}