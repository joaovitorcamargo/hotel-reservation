import { HotelRepository } from '@/patterns/repositories/hotel-repository';
import { HotelNotFound } from '../error/hotel-not-found-error';
import { ReservationRepository } from '@/patterns/repositories/reservation-repository';

interface GetQuantityVacanciesRequest {
  id: string;
}

interface GetQuantityVacanciesResponse {
  total: number;
}

export class GetQuantityVacanciesDataUseCase {
  private hotelRepository: HotelRepository;
  private reservationRepository: ReservationRepository;

  constructor(
    hotelRepository: HotelRepository,
    reservationRepository: ReservationRepository,
  ) {
    this.hotelRepository = hotelRepository;
    this.reservationRepository = reservationRepository;
  }

  async execute({
    id,
  }: GetQuantityVacanciesRequest): Promise<GetQuantityVacanciesResponse> {
    const hotel = await this.hotelRepository.findHotelById(id);

    if (!hotel) {
      throw new HotelNotFound();
    }

    const totalVacanciesHotel =
      await this.hotelRepository.getRemainingVacancies(id);

    const totalReservation =
      await this.reservationRepository.getReservationByHotelId(id);

    const total = totalVacanciesHotel - totalReservation;

    return {
      total,
    };
  }
}
