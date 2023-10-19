import { Hotel, Prisma } from '@prisma/client';
import { prisma } from '@/client/prisma';
import { HotelRepository } from '../hotel-repository';

export class PrismaHotelRepository implements HotelRepository {
  async create(data: Prisma.HotelCreateInput): Promise<Hotel> {
    const hotel = await prisma.hotel.create({
      data,
    });

    return hotel;
  }

  async findUserByCnpj(cnpj: string): Promise<Hotel | null> {
    const hotel = await prisma.hotel.findUnique({
      where: {
        cnpj,
      },
    });

    return hotel;
  }

  async findHotelById(id: string): Promise<Hotel | null> {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id,
      },
    });

    return hotel;
  }

  async update(id: string, data: Prisma.HotelUpdateInput): Promise<Hotel> {
    const hotel = await prisma.hotel.update({
      where: {
        id,
      },
      data,
    });

    return hotel;
  }

  async delete(id: string): Promise<Hotel[]> {
    const hotel = await prisma.hotel.delete({
      where: {
        id,
      },
    });

    return [hotel];
  }
}
