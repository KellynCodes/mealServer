import { UserRoles } from './../../../data/enums/user/userRoles';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Username',
    example: 'kelly',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Users phone number',
    example: '+2349430489340',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Users country',
    example: 'Nigeria',
  })
  @IsNotEmpty()
  country: string;

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

  @ApiProperty({
    example: './assets/upload/user/<username.png',
    description: 'Users Profile image.',
  })
  @IsNotEmpty()
  profileURL: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'specifying user roles',
    example: 'admin',
  })
  roles: string[];
}
