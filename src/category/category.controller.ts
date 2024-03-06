import { CreateCategoryDto } from './createCategory.dto';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createCategory(@Request() req, @Body() body: CreateCategoryDto) {
    await this.categoryService.createCategory(body.name, req.user.userId);
    return {
      success: true,
      message: 'Category created!',
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateCategory(
    @Request() req,
    @Body() body: CreateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.categoryService.updateCategory(id, body.name, req.user.userId);
    return { success: true, message: 'Category updated!' };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCategory(@Request() req, @Param('id', ParseIntPipe) id: number) {
    await this.categoryService.deleteCategory(id, req.user.userId);
    return { success: true, message: 'Category deleted!' };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getCategories(
    @Request() req,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const categories = await this.categoryService.getCategories(
      req.user.userId,
      page,
      take,
    );
    return {
      success: true,
      message: 'categories fetched',
      data: categories,
    };
  }
}
