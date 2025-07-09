import { Injectable } from '@nestjs/common';
import { Role, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: Role) {
    if (role) {
      // return this.users.filter((user) => user.role === role);
      return await this.prisma.user.findMany({
        where: {
          role,
        },
      });
    }
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  async create(user: User) {
    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
  }

  async update(id: string, updateUser: User) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUser,
    });
    return updatedUser;
  }

  delete(id: string) {
    const deletedUser = this.prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  }
}
