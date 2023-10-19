import { Hotel } from '@prisma/client';
import { HotelNotFound } from '../error/hotel-not-found-error';
import { HotelRepository } from '@/repositories/hotel-repository';

interface UpdateHotelDataUseCaseRequest {
  id: string;
  description?: string;
  email?: string;
  name?: string;
}

export class UpdateHotelDataUseCase {
  private hotelRepository: HotelRepository;

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute(data: UpdateHotelDataUseCaseRequest): Promise<Hotel | null> {
    const hotelIsFounded = await this.hotelRepository.findHotelById(data.id);

    if (!hotelIsFounded) {
      throw new HotelNotFound();
    }

    const hotel = await this.hotelRepository.update(data.id, data);

    return hotel;
  }
}
