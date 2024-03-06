import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  @Transform((params) => params.value.trim())
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required' })
  @Transform((params) => params.value.trim())
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required' })
  @Transform((params) => params.value.trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @Transform((params) => params.value.trim())
  password: string;
}

export class SignInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
