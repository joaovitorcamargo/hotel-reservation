import { Prisma, Hotel } from "@prisma/client";

export interface HotelRepository {
  create(data: Prisma.HotelCreateInput): Promise<Hotel>
  findUserByCnpj(cnpj: string): Promise<Hotel|null>
  findHotelById(id: string): Promise<Hotel|null>
  update(id: string, data: Prisma.HotelUncheckedUpdateInput): Promise<Hotel|null>
  delete(id: string): Promise<Hotel[]>
}