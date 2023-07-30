import { ProductCategories } from '../../../data/enums/product/productCategores';
import { ProductSizes } from '../../../data/enums/product/productSizes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductColor } from '../../../data/enums/product/ProductColor';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'property title',
    example: 'Bunch of pineapple',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'property description',
    example: 'sweet fried rice.',
  })
  desc: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'property image url',
    example: 'https://meals/uploads/image-part.png',
  })
  img: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'property categories',
    example: 'fruit',
  })
  categories: ProductCategories[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'property sizes',
    example: 'small',
  })
  size: ProductSizes[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'property colors',
    example: 'red',
  })
  color: ProductColor[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'price of product',
    example: 5000000000,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'price of product',
    example: true,
  })
  InStock: boolean;
}
