import { Prisma, Reservation } from '@prisma/client';
import { prisma } from '@/client/prisma';
import { ReservationRepository } from '../reservation-repository';

export class PrismaReservationRepository implements ReservationRepository {
  async create(
    data: Prisma.ReservationUncheckedCreateInput,
  ): Promise<Reservation> {
    const reservation = await prisma.reservation.create({ data });

    return reservation;
  }
}
