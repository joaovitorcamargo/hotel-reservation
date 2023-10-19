import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findUserByEmailOrCpf(email?: string, cpf?: string) {
    const user = this.items.find(item => item.email === email || item.cpf === cpf)

    if(!user) {
      return null
    }

    return user
  }

  async findUserById(id: string) {
    const user = this.items.find(item => item.id === id)

    if(!user) {
      return null
    }
    
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email:data.email,
      cpf: data.cpf,
      created_at: new Date()
    }
    
    this.items.push(user)

    return user
  }

  async updateUserData(id: string, data: Prisma.UserUpdateInput) {
    const getIndexItem = this.items.findIndex(item => item.id === id)

    if(getIndexItem < 0) {
      return null
    }
    if(data.name) {
      this.items[getIndexItem].name = data.name.toString()
    }
    if(data.email) {
      this.items[getIndexItem].email = data.email.toString()
    }

    return this.items[getIndexItem]
  }

}