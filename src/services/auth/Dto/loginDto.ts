import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'kellyncodes@gmail.com',
  })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @ApiProperty({
    description: 'username',
    example: 'Wkr6ltYqglaQr39fadf',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
