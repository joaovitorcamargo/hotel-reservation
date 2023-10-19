import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { prisma } from '@/client/prisma';

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = prisma.user.create({
      data,
    });

    return user;
  }

  async findUserByEmailOrCpf(
    email?: string,
    cpf?: string,
  ): Promise<User | null> {
    const user = prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  async delete(id: string): Promise<User[]> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return [user];
  }
}
