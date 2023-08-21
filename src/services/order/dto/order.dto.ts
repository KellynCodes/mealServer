import { ProductDto } from './../../product/Dto/product.dto';
import { ProductStatus } from './../../../data/enums/product/productStatus';
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'userId',
    example: '938220843o4804280024f930',
  })
  userId: string;

  @ApiProperty({
    description: 'Foreign key to properties table',
  })
  product: {
    productId: string;
    product: ProductDto;
    quantity: number;
  };

  @IsNotEmpty()
  @ApiProperty({
    description: 'address of the product',
    example: 'No. 45 chime avenue enugu.',
  })
  address: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'amount of the product',
    example: 'pending',
  })
  status: ProductStatus;
}
