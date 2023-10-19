import { Prisma, Reservation } from '@prisma/client';

export interface ReservationRepository {
  create(data: Prisma.ReservationUncheckedCreateInput): Promise<Reservation>;
}
