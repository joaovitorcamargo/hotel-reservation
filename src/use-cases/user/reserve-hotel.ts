import { Reservation } from '@prisma/client';
import { ReservationRepository } from '@/repositories/reservation-repository';
import { HotelRepository } from '@/repositories/hotel-repository';
import { HotelNotFound } from '../error/hotel-not-found-error';
import { UserRepository } from '@/repositories/user-repository';
import { UserNotFound } from '../error/user-not-found-error';
import { HotelHasNoVacancies } from '../error/hotel-has-no-vacancies-error';

interface ReserveUseCaseRequest {
  userId: string;
  hotelId: string;
  start_date: Date;
  end_date: Date;
}

interface ReserveHotelUseResponse {
  reservation: Reservation;
}

export class ReserveHotelUseCase {
  private reservationRepository: ReservationRepository;
  private hotelRepository: HotelRepository;
  private userRepository: UserRepository;

  constructor(
    reservationRepository: ReservationRepository,
    hotelRepository: HotelRepository,
    userRepository: UserRepository,
  ) {
    this.reservationRepository = reservationRepository;
    this.hotelRepository = hotelRepository;
    this.userRepository = userRepository;
  }

  async execute({
    userId,
    hotelId,
    start_date,
    end_date,
  }: ReserveUseCaseRequest): Promise<ReserveHotelUseResponse> {
    const hotelIsFounded = await this.hotelRepository.findHotelById(hotelId);

    if (!hotelIsFounded) {
      throw new HotelNotFound();
    }

    const userIsFounded = await this.userRepository.findUserById(userId);

    if (!userIsFounded) {
      throw new UserNotFound();
    }

    const totalVacanciesHotel =
      await this.hotelRepository.getVacancies(hotelId);

    const totalReservation =
      await this.reservationRepository.getReservationByHotelId(hotelId);

    const total = totalVacanciesHotel - totalReservation;

    if (!total) {
      throw new HotelHasNoVacancies();
    }

    const reservation = await this.reservationRepository.create({
      user_id: userId,
      hotel_id: hotelId,
      start_date,
      end_date,
    });

    return {
      reservation,
    };
  }
}
