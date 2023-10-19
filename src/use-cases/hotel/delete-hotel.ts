import { Hotel } from "@prisma/client";
import { HotelRepository } from "@/patterns/repositories/hotel-repository";
import { HotelNotFound } from "../error/hotel-not-found-error";

interface DeleteHotelUseCaseRequest {
  id: string
}

interface DeleteHotelUseCaseResponse {
  hotels: Hotel[]
}

export class DeleteHotelUseCase {
  private hotelRepository: HotelRepository

  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository
  }

  async execute({
    id
  }: DeleteHotelUseCaseRequest): Promise<DeleteHotelUseCaseResponse> {

    const hotelIsFounded = await this.hotelRepository.findHotelById(id)    

    if(!hotelIsFounded) {
      throw new HotelNotFound()
    }

    const hotels = await this.hotelRepository.delete(id)

    return {hotels}
  }

}