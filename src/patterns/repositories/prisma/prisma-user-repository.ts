import { Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { prisma } from "@/client/prisma";

export class PrismaUserRepository implements UserRepository{
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data
    })

    return user
  }

  async findUserByEmailOrCpf(email?: string, cpf?: string) {
    const user = prisma.user.findFirst({
      where: {
        OR: [{email},{cpf}]
      }
    })

    return user
  }

  async findUserById(id: string) {
    const user = prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data
    })

    return user
  }

  async delete(id: string) {
   const user =  await prisma.user.delete({
      where: {
        id
      },
    })

    return [user]
  }

}