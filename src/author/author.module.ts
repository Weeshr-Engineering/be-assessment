import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthorController } from './author.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthorService } from './author.service';

@Module({
  providers: [PrismaService, JwtService, AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
