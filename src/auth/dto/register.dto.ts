import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'eka@example.com',
    description: 'Alamat email yang valid dan unik',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Eka Prasetyo',
    description: 'Nama lengkap pengguna',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'secret123',
    minLength: 6,
    description: 'Password minimal 6 karakter',
  })
  @MinLength(6)
  password: string;
}
