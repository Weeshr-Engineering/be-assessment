import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './createBook.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createBook(@Request() req, @Body() body: CreateBookDto) {
    await this.bookService.createBook(body, req.user.userId);
    return {
      success: true,
      message: 'Book added!',
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getBook(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const book = await this.bookService.getBook(id, req.user.userId);
    return {
      success: true,
      message: 'Book fetched',
      data: book,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateBook(
    @Request() req,
    @Body() body: UpdateBookDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.bookService.updateBook(id, body, req.user.userId);
    return {
      success: true,
      message: 'Book updated!',
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getBooks(
    @Request() req,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('page', new DefaultValuePipe(11), ParseIntPipe) page: number,
    @Query('categoryId', ParseIntPipe) @Optional() categoryId?: number,
    @Query('authorId', ParseIntPipe) @Optional() authorId?: number,
  ) {
    const books = await this.bookService.getBooks(
      categoryId,
      req.user.userId,
      authorId,
      page,
      take,
    );

    return {
      success: true,
      message: 'Books fetched!',
      data: books,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBook(@Request() req, @Param('id', ParseIntPipe) id: number) {
    await this.bookService.deleteBook(id, req.user.userId);
    return {
      success: true,
      message: 'Book deleted successfully!',
    };
  }
}
