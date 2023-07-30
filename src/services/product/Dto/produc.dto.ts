import { ProductCategories } from './../../../data/enums/product/productCategores';
import { ProductSizes } from './../../../data/enums/product/productSizes';
import { ApiProperty } from '@nestjs/swagger';
import { ProductColor } from '../../../data/enums/product/ProductColor';

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
    description: 'property image url',
    example: 'https://meals/uploads/image-part.png',
  })
  img: string;

  @ApiProperty({
    description: 'property categories',
    example: 'fruit',
  })
  categories: ProductCategories[];

  @ApiProperty({
    description: 'property sizes',
    example: 'small',
  })
  size: ProductSizes[];

  @ApiProperty({
    description: 'property colors',
    example: 'red',
  })
  color: ProductColor[];

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
}
