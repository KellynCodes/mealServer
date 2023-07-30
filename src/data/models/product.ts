import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { ProductCategories } from '../enums/product/productCategores';
import { ProductSizes } from '../enums/product/productSizes';
import { ProductColor } from '../enums/product/ProductColor';

@Schema({
  timestamps: true,
})
export class Product {
  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'property title',
    example: 'Bunch of pineaple',
  })
  title: string;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'property description',
    example: 'sweet fried rice.',
  })
  desc: string;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'property image url',
    example: 'https://meals/uploads/image-part.png',
  })
  img: string;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'property categories',
    example: 'fruit',
    type: ProductCategories,
  })
  categories: ProductCategories[];

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'property sizes',
    example: 'small',
    type: ProductSizes,
  })
  size: ProductSizes[];

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'property colors',
    example: 'red',
    type: ProductColor,
  })
  color: ProductColor[];

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'price of product',
    example: 5000000000,
  })
  price: number;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'price of product',
    example: true,
  })
  InStock: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
