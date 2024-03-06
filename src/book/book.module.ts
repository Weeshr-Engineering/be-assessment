import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookService } from './book.service';
import { JwtService } from '@nestjs/jwt';
import { BookController } from './book.controller';
import { CategoryService } from '../category/category.service';
import { AuthorService } from '../author/author.service';

@Module({
  providers: [
    PrismaService,
    BookService,
    JwtService,
    CategoryService,
    AuthorService,
  ],
  controllers: [BookController],
})
export class BookModule {}
