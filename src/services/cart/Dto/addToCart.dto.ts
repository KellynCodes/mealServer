import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCartDto } from './productCart.dto';
import { UserCartDto } from './userCart.dto';

export class CartDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'User id',
  })
  user: UserCartDto;

  @ApiProperty({
    description: 'Products detail',
  })
  product: ProductCartDto;

  @ApiProperty({
    description: 'Products quantity',
  })
  @IsNotEmpty()
  quantity: number;
}
