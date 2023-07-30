import { ObjectIdValidator } from './../../utils/validate.objectId';
import { ProductSchema } from './../../data/models/product';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ProductService } from 'src/services/product/product.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtService, ObjectIdValidator],
  exports: [MongooseModule, PassportModule],
})
export class ProductModule {}
