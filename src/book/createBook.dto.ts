import { IsISBN, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType, PickType } from '@nestjs/swagger';
import { SignUpDto } from '../auth/dto/signUp.dto';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Book title is required' })
  @Transform((params) => params.value.trim())
  title: string;

  @IsNotEmpty({ message: 'ISBN is required' })
  @Transform((params) => params.value.trim())
  @IsISBN()
  isbn: string;

  @IsNotEmpty({ message: 'Year of publication is required' })
  @Transform((params) => params.value.trim())
  pub_year: string;

  @IsNotEmpty({ message: 'Book title is required' })
  @IsNumber()
  categoryId: number;

  @IsNotEmpty({ message: 'Book title is required' })
  @IsNumber()
  authorId: number;
}

export class UpdateBookDto extends PickType(CreateBookDto, [
  'title',
  'isbn',
  'pub_year',
] as const) {}
