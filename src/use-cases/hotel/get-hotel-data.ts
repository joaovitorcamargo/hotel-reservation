import { Hotel } from '@prisma/client';
import { HotelRepository } from '@/repositories/hotel-repository';
import { HotelNotFound } from '../error/hotel-not-found-error';

interface GetHotelDataRequest {
  id: string;
}

interface GetHotelDataResponse {
  hotel: Hotel;
}

export class GetHotelDataUseCase {
  private hotelRepository: HotelRepository;

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute({ id }: GetHotelDataRequest): Promise<GetHotelDataResponse> {
    const hotel = await this.hotelRepository.findHotelById(id);

    if (!hotel) {
      throw new HotelNotFound();
    }

    return {
      hotel,
    };
  }
}
