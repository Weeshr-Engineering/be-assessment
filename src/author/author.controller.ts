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
import { CreateAuthorDto, UpdateAuthorDto } from './createAuthor.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createAuthor(@Body() body: CreateAuthorDto, @Request() req) {
    await this.authorService.createAuthor(body, req.user.userId);
    return {
      success: true,
      message: 'Author added successfully',
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAuthors(
    @Request() req,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('firstName') @Optional() firstName?: string,
    @Query('lastName') @Optional() lastName?: string,
    @Query('country') @Optional() country?: string,
  ) {
    const authors = await this.authorService.getAuthors(
      take,
      page,
      req.user.userId,
      firstName,
      lastName,
      country,
    );

    return {
      success: true,
      message: 'Authors fetched',
      data: authors,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    body: UpdateAuthorDto,
  ) {
    await this.authorService.updateAuthor(body, id);
    return { success: true, message: 'Author updated!' };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    await this.authorService.deleteAuthor(id);
    return { success: true, message: 'Author deleted!' };
  }
}
