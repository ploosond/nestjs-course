import { Injectable } from '@nestjs/common';
import { Role } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(role?: Role) {
    if (role) {
      if (!Object.values(Role).includes(role as Role)) {
        throw new NotFoundException(`Invalid role ${role}`);
      }
      // return this.users.filter((user) => user.role === role);
      const rolesArray = await this.prisma.user.findMany({
        where: {
          role,
        },
      });

      if (rolesArray.length === 0) {
        throw new NotFoundException('No users found with the specified role');
      }

      return rolesArray;
    }
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
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
