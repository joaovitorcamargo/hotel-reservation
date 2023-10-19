import { Prisma, Hotel } from "@prisma/client";
import { randomUUID } from "crypto";
import { HotelRepository } from "../hotel-repository";

export class InMemoryHotelRepository implements HotelRepository {
  public items: Hotel[] = []

  async create(data: Prisma.HotelCreateInput) {
    const hotel = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,
      cnpj: data.cnpj,
      email: data.email,
      vacancies: data.vacancies,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    }
    
    this.items.push(hotel)

    return hotel
  }

  async findUserByCnpj(cnpj: string) {
    const hotel = this.items.find(item => item.cnpj === cnpj)

    if(!hotel) {
      return null
    }

    return hotel
  }
}