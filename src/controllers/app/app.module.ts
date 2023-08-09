import { Seeder } from './../../data/db/seedAdmin';
import { ImageMiddleware } from './../../middlewares/file.middleware';
import { ObjectIdValidator } from './../../utils/validate.objectId';
import { HttpExceptionFilter } from '../../middlewares/global.exc.handler';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../../services/cart/app/app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { ProductModule } from '../product/product.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_REMOTE_URI),
    UserModule,
    ProductModule,
    CartModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
            issuer: config.get<string>('JWT_ISSUER'),
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
    JwtService,
    ObjectIdValidator,
    Seeder,
  ],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private seeder: Seeder) {}
  onApplicationBootstrap() {
    this.seeder.seedAdmin();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImageMiddleware)
      .forRoutes('uploads/products')
      .apply(ImageMiddleware)
      .forRoutes('uploads/users');
  }
}
