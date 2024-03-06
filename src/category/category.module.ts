import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CategoryService, PrismaService, JwtService],
  controllers: [CategoryController],
})
export class CategoryModule {}
