export class HotelAlreadyExists extends Error {
  constructor() {
    super('Hotel Already Exists.');
  }
}
