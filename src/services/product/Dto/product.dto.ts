import { Express } from 'express';
import { Date } from 'mongoose';
import { ProductCategories } from '../../../data/enums/product/foodCategores';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'property title',
    example: 'Bunch of pineapple',
  })
  title: string;

  @ApiProperty({
    description: 'property description',
    example: 'sweet fried rice.',
  })
  desc: string;

  @ApiProperty({
    description: 'property categories',
    example: 'fruit',
  })
  categories: ProductCategories[];

  @ApiProperty({
    description: 'price of product',
    example: 5000000000,
  })
  price: number;

  @ApiProperty({
    description: 'price of product',
    example: true,
  })
  InStock: boolean;

  @ApiProperty({
    description: 'price of product',
    example: './assets/upload/products/ifoafafpeaproduct.png',
  })
  img: string;

  @ApiProperty({
    description: 'price of product',
    example: new Date(),
    type: Date,
  })
  date: Date;
}
