import { SignUpDto } from './../../services/auth/Dto/signUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Seeder {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async seedAdmin(): Promise<void> {
    console.log('Seeding admin...');
    let model: SignUpDto = {
      username: process.env.ROOT_USER,
      email: process.env.EMAIL,
      phone: process.env.PHONE,
      password: process.env.PASSWORD,
      profileURL: process.env.PROFILE_URL,
      country: process.env.COUNTRY,
      roles: ['admin'],
    };
    const isUserExist = await this.userModel.findOne({ email: model.email });
    if (isUserExist != null) {
      console.log('Account exist with this email.');
      return;
    }

    const isUserNameExist = await this.userModel.findOne({
      username: model.username,
    });

    if (isUserNameExist != null) {
      console.log(`Sorry! username ${model.username} is not available.`);
      return;
    }

    const isPhoneExist = await this.userModel.findOne({ phone: model.phone });

    if (isPhoneExist != null) {
      console.log(`Sorry user exist with this: ${model.phone}`);
      return;
    }
    const hashedPassword: string = await bcrypt.hash(model.password, 10);
    const user = await this.userModel.create({
      username: model.username,
      country: model.country,
      phone: model.phone,
      email: model.email,
      password: hashedPassword,
      profileURL: model.profileURL,
      roles: model.roles,
      isActive: true,
    });

    console.log(`${user.username} was created successfully.`);
  }
}
