import { Hotel } from '@prisma/client';
import { HotelRepository } from '@/patterns/repositories/hotel-repository';
import { HotelAlreadyExists } from '../error/hotel-already-exists-error';

interface RegisterHotelCaseRequest {
  name: string;
  description: string | null;
  cnpj: string;
  email: string;
  vacancies: number;
  latitude: number;
  longitude: number;
}

interface RegisterHotelCaseResponse {
  hotel: Hotel;
}

export class RegisterHotelUseCase {
  private hotelRepository: HotelRepository;

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute({
    name,
    description,
    cnpj,
    email,
    vacancies,
    latitude,
    longitude,
  }: RegisterHotelCaseRequest): Promise<RegisterHotelCaseResponse> {
    const hotelAlreadyExists = await this.hotelRepository.findUserByCnpj(cnpj);

    if (hotelAlreadyExists) {
      throw new HotelAlreadyExists();
    }

    const hotel = await this.hotelRepository.create({
      name,
      description,
      cnpj,
      email,
      vacancies,
      latitude,
      longitude,
    });

    return {
      hotel,
    };
  }
}
