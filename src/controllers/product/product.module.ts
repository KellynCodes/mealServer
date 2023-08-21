import { OrderService } from './../../services/order/order.service';
import { ObjectIdValidator } from './../../utils/validate.objectId';
import { ProductSchema } from './../../data/models/product';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ProductService } from '../../services/product/product.service';
import { OrderSchema } from '../../data/models/order';
import { OrderController } from '../order/order.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    UserModule,
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, JwtService, ObjectIdValidator, OrderService],
  exports: [MongooseModule, PassportModule],
})
export class ProductModule {}
