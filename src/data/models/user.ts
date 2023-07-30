import { UserRoles } from './../enums/user/userRoles';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  country: string;

  @Prop({
    required: [true, 'phone cannot be empty.'],
    unique: [true, 'Phone number already exist.'],
  })
  phone: number;

  @Prop()
  username: string;

  @Prop({ unique: [true, 'User already exist.'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileURL: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
