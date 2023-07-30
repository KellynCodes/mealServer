import { CartSchema } from './../../data/models/cart';
import { CartController } from './cart.controller';
import { CartService } from '../../services/cart/cart.service';
import { ObjectIdValidator } from './../../utils/validate.objectId';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])],
  controllers: [CartController],
  providers: [CartService, ObjectIdValidator],
  exports: [MongooseModule],
})
export class CartModule {}
