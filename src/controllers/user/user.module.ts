import { UserService } from './../../services/user/user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../../middlewares/jwt.strategy';
import { UserSchema } from '../../data/models/user';
import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class UserModule {}
