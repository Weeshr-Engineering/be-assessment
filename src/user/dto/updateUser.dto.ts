import { SignUpDto } from '../../auth/dto/signUp.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateUserDto extends PickType(SignUpDto, [
  'firstName',
  'lastName',
] as const) {}
