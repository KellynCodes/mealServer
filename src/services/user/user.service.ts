import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { User } from './../../data/models/user';
import { UserDto } from './Dto/user.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { HttpResponse } from '../../data/Dtos/http.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  public async updateUserAsync(
    id: string,
    model: UserDto,
  ): Promise<HttpResponse<UserDto>> {
    if (model.password != null) {
      const hashedPassword: string = await bcrypt.hash(model.password, 10);
      model.password = hashedPassword;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, model, {
      new: true,
    });
    const response: HttpResponse<UserDto> = {
      message: `${updatedUser.username} your account has been updated successfully.`,
      statusCode: HttpStatus.OK,
      data: updatedUser,
    };
    return response;
  }

  public async deleteUserAsync(id: string): Promise<HttpResponse> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (deletedUser == null) {
      const response: HttpResponse = {
        message: 'User not found.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse = {
      message: 'User has been deleted.',
      statusCode: HttpStatus.OK,
    };
    return response;
  }

  public async getUserAsync(id: string): Promise<HttpResponse<UserDto>> {
    const user = await this.userModel.findById(id);
    if (user == null) {
      const response: HttpResponse = {
        message: 'user not found.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<UserDto> = {
      message: `${user.username} was found.`,
      statusCode: HttpStatus.OK,
      data: user,
    };
    return response;
  }

  public async getAllUserAsync(
    query: RequestQuery,
  ): Promise<HttpResponse<User[]>> {
    const keyword: string =
      query.keyword == null ? (query.keyword = '') : query.keyword;
    const page: number =
      query.page == null ? (query.page = 1) : Number(query.page);
    const resPerPage: number = 2;
    const skip: number = resPerPage * (page - 1);
    let filter: {} = {};
    if (keyword != '') {
      filter = {
        username: {
          $regex: keyword,
          $options: 'i',
        },
      };
    }
    const user = await this.userModel
      .find({ ...filter })
      .limit(resPerPage)
      .skip(skip)
      .exec();
    if (user.length <= 0) {
      const response: HttpResponse = {
        message: 'No user found.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<User[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available profiles',
      data: user,
    };
    return response;
  }
}
