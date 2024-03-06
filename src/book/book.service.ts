import { PrismaService } from '../prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateBookDto, UpdateBookDto } from './createBook.dto';
import { AuthorService } from '../author/author.service';
@Injectable()
export class BookService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
    private authorService: AuthorService,
  ) {}

  async createBook(body: CreateBookDto, userId: number) {
    try {
      const category = await this.categoryService.getCategory(body.categoryId);

      if (!category) {
        throw new BadRequestException('Category does not exist; create it!');
      }

      const author = await this.authorService.getAuthor(body.authorId);

      if (!author) {
        throw new BadRequestException('Author does not exist; create author');
      }

      const book = await this.prisma.book.create({
        data: {
          title: body.title,
          isbn: body.isbn,
          pub_year: body.pub_year,
          categoryId: body.categoryId,
          userId: userId,
          authorId: body.authorId,
        },
      });
      return book;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async updateBook(id: number, data: UpdateBookDto, userId: number) {
    return this.prisma.book.update({
      where: {
        id,
        userId,
      },
      data: { ...data },
    });
  }
  async getBook(id: number, userId: number) {
    return this.prisma.book.findFirstOrThrow({
      where: {
        id: id,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        pub_year: true,
        isbn: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            country: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getBooks(
    categoryId: number,
    userId: number,
    authorId: number,
    page: number,
    take: number,
  ) {
    const skip = (page - 1) * take;
    return this.prisma.book.findMany({
      where: {
        userId: userId,
        ...(categoryId && { categoryId: categoryId }),
        ...(authorId && { authorId: authorId }),
      },
      select: {
        id: true,
        title: true,
        isbn: true,
        pub_year: true,
      },
      take: take,
      skip: skip,
      orderBy: {
        title: 'asc',
      },
    });
  }

  async deleteBook(id: number, userId: number) {
    return this.prisma.book.delete({
      where: {
        id: id,
        userId,
      },
    });
  }
}
