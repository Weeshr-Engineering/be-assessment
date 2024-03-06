import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Provide category name' })
  @Transform((params) => params.value.trim())
  name: string;
}
