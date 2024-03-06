import { PrismaService } from '../prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoryByName(name: string, userId: number) {
    return this.prisma.category.findFirst({
      where: {
        name: name,
        userId: userId,
      },
    });
  }

  async createCategory(name: string, userId: number) {
    const categoryExist = await this.getCategoryByName(name, userId);
    if (categoryExist) {
      throw new ConflictException('Category exists!');
    }
    return this.prisma.category.create({
      data: {
        name: name,
        userId: userId,
      },
    });
  }

  async updateCategory(id: number, name: string, userId: number) {
    return this.prisma.category.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        name: name,
      },
    });
  }

  async getCategory(id: number) {
    return this.prisma.category.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getCategories(userId: number, page: number, take: number) {
    const skip = (page - 1) * take;
    return this.prisma.category.findMany({
      where: {
        userId: userId,
      },
      skip: skip,
      take: take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async deleteCategory(id: number, userId: number) {
    return this.prisma.category.delete({
      where: {
        id: id,
        userId,
      },
    });
  }
}
