import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductStatus } from '../enums/product/productStatus';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'userId',
    example: '938220843o4804280024f930',
  })
  userId: string;

  @ApiProperty({
    description: 'Foreign key to properties table',
  })
  @Prop()
  Products: [
    {
      productId: string;
      quantity: number;
    },
  ];

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'amount of the product',
    example: 4000,
  })
  amount: number;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'address of the product',
    example: 'No. 45 chime avenue enugu.',
  })
  address: string;

  @IsNotEmpty()
  @Prop()
  @ApiProperty({
    description: 'amount of the product',
    example: 4000,
  })
  status: ProductStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
