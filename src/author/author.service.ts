import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAuthorDto } from './createAuthor.dto';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(data: CreateAuthorDto, userId: number) {
    return this.prisma.author.create({
      data: { ...data, userId: userId },
    });
  }

  async getAuthor(id: number) {
    return this.prisma.author.findFirst({
      where: {
        id: id,
      },
    });
  }

  async updateAuthor(data: Partial<Author>, userId: number) {
    return this.prisma.author.update({
      where: {
        id: userId,
      },
      data: { ...data },
    });
  }

  async getAuthors(
    take: number,
    page: number,
    userId: number,
    firstName: string,
    lastName: string,
    country: string,
  ) {
    const skip = (page - 1) * take;
    return this.prisma.author.findMany({
      where: {
        userId: userId,
        ...(firstName && { firstName: firstName }),
        ...(lastName && { lastName: firstName }),
        ...(country && { country: country }),
      },
      skip,
      take,
      ...(firstName && {
        orderBy: {
          firstName: 'asc',
        },
      }),
    });
  }

  async deleteAuthor(id: number) {
    return this.prisma.author.delete({
      where: {
        id: id,
      },
    });
  }
}
