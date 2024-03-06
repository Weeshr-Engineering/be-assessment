import {
  IsEmail,
  IsISBN,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType, PickType } from '@nestjs/swagger';
import { SignUpDto } from '../auth/dto/signUp.dto';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'First Name is required' })
  @Transform((params) => params.value.trim())
  firstName: string;

  @IsNotEmpty({ message: 'ISBN is required' })
  @Transform((params) => params.value.trim())
  lastName: string;

  @IsOptional()
  @Transform((params) => params.value.trim())
  @IsEmail()
  email: string;

  @IsOptional()
  @Transform((params) => params.value.trim())
  country: string;
}

export class UpdateAuthorDto extends PickType(CreateAuthorDto, [
  'firstName',
  'lastName',
  'email',
  'country',
] as const) {}
