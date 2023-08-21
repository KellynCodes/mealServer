import { ProductDto } from '../../services/product/Dto/product.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { ProductStatus } from '../enums/product/productStatus';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  @IsNotEmpty()
  @Prop()
  userId: string;

  @Prop({ type: Object })
  product: {
    productId: string;
    product: ProductDto;
    quantity: number;
  };

  @IsNotEmpty()
  @Prop()
  address: string;

  @IsNotEmpty()
  @Prop()
  status: ProductStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
