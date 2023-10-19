import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async findUserByEmailOrCpf(
    email?: string,
    cpf?: string,
  ): Promise<User | null> {
    const user = this.items.find(
      (item) => item.email === email || item.cpf === cpf,
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    const getIndexItem = this.items.findIndex((item) => item.id === id);

    if (getIndexItem < 0) {
      return null;
    }
    if (data.name) {
      this.items[getIndexItem].name = data.name.toString();
    }
    if (data.email) {
      this.items[getIndexItem].email = data.email.toString();
    }

    return this.items[getIndexItem];
  }

  async delete(id: string): Promise<User[]> {
    const users = this.items.filter((item) => item.id != id);

    return users;
  }
}
