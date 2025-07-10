import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  description?: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  category: string;
}
