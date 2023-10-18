import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string, cpf: string) {
    const user = this.items.find(item => item.email === email || item.cpf === cpf)

    if(!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id:randomUUID(),
      name: data.name,
      email:data.email,
      cpf: data.cpf,
      created_at: new Date()
    }
    
    this.items.push(user)

    return user
  }
}