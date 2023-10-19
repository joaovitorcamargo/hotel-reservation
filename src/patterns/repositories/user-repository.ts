import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findUserById(id: string): Promise<User|null>
  findUserByEmailOrCpf(email?: string, cpf?: string): Promise<User|null>
  update(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User|null>
  delete(id: string): Promise<User[]>
}