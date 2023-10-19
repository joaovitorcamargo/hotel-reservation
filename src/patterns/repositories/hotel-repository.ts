import { Prisma, Hotel } from "@prisma/client";

export interface HotelRepository {
  create(data: Prisma.HotelCreateInput): Promise<Hotel>
  findUserByCnpj(cnpj: string): Promise<Hotel|null>
}