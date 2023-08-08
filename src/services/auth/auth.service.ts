import { UserDto } from './../user/Dto/user.dto';
import { User } from './../../data/models/user';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './Dto/signUpDto';
import { LoginDto } from './Dto/loginDto';
import { ResetPasswordDto } from './Dto/reset.password';
import { HttpResponse } from '../../data/Dtos/http.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(model: SignUpDto): Promise<HttpResponse<{ token: string }>> {
    const isUserExist = await this.userModel.findOne({ email: model.email });
    if (isUserExist != null) {
      throw new BadRequestException('Account exist with this email.');
    }

    const isUserNameExist = await this.userModel.findOne({
      username: model.username,
    });

    if (isUserNameExist != null) {
      throw new BadRequestException('Sorry! this username is not available.');
    }

    const isPhoneExist = await this.userModel.findOne({ phone: model.phone });

    if (isPhoneExist != null) {
      throw new BadRequestException('Sorry! this phone number has been used.');
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

    const token: string = this.jwtService.sign({
      id: user._id,
      email: user.email,
      roles: model.roles,
    });
    const response: HttpResponse<{ token: string }> = {
      message: 'Login Successful.',
      statusCode: HttpStatus.OK,
      data: { token: token },
    };
    return response;
  }

  async login(model: LoginDto): Promise<HttpResponse<{ token: string }>> {
    const user = await this.userModel.findOne({ email: model.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordMatched: boolean = await bcrypt.compare(
      model.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid email or password.');
    }

    const token: string = this.jwtService.sign({
      id: user._id,
      email: user.email,
      roles: user.roles,
    });
    const res: HttpResponse<{ token: string }> = {
      message: 'Login Successful',
      statusCode: HttpStatus.OK,
      data: { token: token },
    };
    return res;
  }

  async resetPasswordAsync(model: ResetPasswordDto): Promise<void> {}
  async forgotPasswordAsync(email: string): Promise<void> {}
  async verifyEmailAsync(email: string): Promise<void> {}
  async updateAsync(model: any): Promise<void> {}
  async updateUserAsync(model: UserDto): Promise<HttpResponse<UserDto>> {
    const response: HttpResponse<UserDto> = {
      message: '',
      statusCode: HttpStatus.OK,
    };
    return response;
  }
}
