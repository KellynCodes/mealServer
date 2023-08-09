import { Express } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { ProductCategories } from '../enums/product/foodCategores';
import { Date } from 'mongoose';

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
    description: 'property categories',
    example: 'fruit',
    type: ProductCategories,
  })
  categories: ProductCategories[];

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'price of product',
    example: 5000,
  })
  price: number;

  @Prop()
  @ApiProperty({
    description: 'price of product',
    example: true,
  })
  InStock: boolean;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'price of product',
    example: './assets/uploads/products/iapfkadaadfiakdf.png',
  })
  img: string;

  @IsNotEmpty()
  @Prop({ type: Date })
  @ApiProperty({})
  date: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
