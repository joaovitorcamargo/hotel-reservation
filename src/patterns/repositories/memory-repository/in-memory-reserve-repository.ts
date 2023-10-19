import { Prisma, Reservation } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ReservationRepository } from '../reservation-repository';

export class InMemoryReserveRepository implements ReservationRepository {
  public items: Reservation[] = [];

  async create(
    data: Prisma.ReservationUncheckedCreateInput,
  ): Promise<Reservation> {
    const reservation = {
      id: randomUUID(),
      user_id: data.user_id,
      hotel_id: data.hotel_id,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      created_at: new Date(),
    };

    this.items.push(reservation);

    return reservation;
  }
}
