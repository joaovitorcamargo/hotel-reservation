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

  async findHotelById(id: string) {
    const hotel = prisma.hotel.findUnique({
      where: {
        id
      }
    })

    return hotel
  }

  async update(id: string, data: Prisma.HotelUpdateInput) {
    const hotel = await prisma.hotel.update({
      where: {
        id
      },
      data
    })

    return hotel
  }

}