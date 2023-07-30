import { UserCartDto } from './../../services/cart/Dto/userCart.dto';
import { ProductCartDto } from './../../services/cart/Dto/productCart.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@Schema({ timestamps: true })
export class Cart {
  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User id',
  })
  user: UserCartDto;

  @Prop()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Products detail',
  })
  product: ProductCartDto;

  @Prop()
  @ApiProperty({
    description: 'Products quantity',
  })
  @IsNotEmpty()
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
