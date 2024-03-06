import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { hash } from '../utils/utils';
import { SignUpDto } from '../auth/dto/signUp.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async createUser(data: SignUpDto) {
    return this.prisma.user.create({
      data: { ...data, password: await hash(data.password) },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: { ...data },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
