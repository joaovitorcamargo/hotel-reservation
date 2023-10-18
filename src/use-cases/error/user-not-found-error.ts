export class UserNotFound extends Error {
  constructor() {
    super('User Already Exists.')
  }
}