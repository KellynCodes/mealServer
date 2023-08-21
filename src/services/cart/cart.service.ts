import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { ObjectIdValidator } from './../../utils/validate.objectId';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../../data/models/cart';
import { CartDto } from './Dto/addToCart.dto';
import { HttpResponse } from '../../data/Dtos/http.response.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private objectIdValidator: ObjectIdValidator,
  ) {}

  async addAsync(model: CartDto): Promise<HttpResponse<CartDto>> {
    if (model == null) {
      throw new BadRequestException('Payload cannot be empty.');
    }

    this.objectIdValidator.validate(model.product.productId);
    const productId: string = model.product.productId;
    const userId: string = model.user.userId;
    const count = await this.cartModel
      .countDocuments({ 'user.userId': userId, 'product.productId': productId })
      .exec();
    if (count > 0) {
      throw new BadRequestException(
        'This product has already been added to your cart.',
      );
    }

    const newCart = await this.cartModel.create(model);
    const response: HttpResponse<CartDto> = {
      message: 'Your card was added.',
      statusCode: HttpStatus.OK,
      data: newCart,
    };
    return response;
  }

  async removeCartAsync(id: string): Promise<HttpResponse> {
    this.objectIdValidator.validate(id);

    const cart = await this.cartModel.findById(id).exec();
    if (cart == null) {
      throw new BadRequestException('This product is not in the cart.');
    }

    await this.cartModel.findByIdAndDelete(id).exec();
    const response: HttpResponse = {
      message: 'Deleted',
      statusCode: HttpStatus.OK,
    };
    return response;
  }

  async getCartAsync(id: string): Promise<HttpResponse<CartDto>> {
    this.objectIdValidator.validate(id);

    const cartItem = await this.cartModel.findById(id).exec();

    if (cartItem == null) {
      throw new BadRequestException('No cart item found.');
    }

    const response: HttpResponse<CartDto> = {
      message: 'Cart item found.',
      statusCode: HttpStatus.OK,
      data: cartItem,
    };
    return response;
  }

  async getCartsAsync(query: RequestQuery): Promise<HttpResponse<CartDto[]>> {
    const keyword: string =
      query.keyword == null ? (query.keyword = '') : query.keyword;
    const page: number = query.page < 1 ? (query.page = 1) : Number(query.page);
    const resPerPage: number = 2;
    const skip: number = resPerPage * (page - 1);
    let filter: {} = {};
    if (keyword != '') {
      filter = {
        title: {
          $regex: keyword,
          $options: 'i',
        },
      };
    }
    const cart = await this.cartModel
      .find({ ...filter })
      .limit(10)
      .skip(skip)
      .exec();
    if (cart.length <= 0) {
      const response: HttpResponse = {
        message: 'No item in cart.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<CartDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available items in your cart',
      data: cart,
    };
    return response;
  }

  async getUsersCartAsync(
    userId: string,
    query: RequestQuery,
  ): Promise<HttpResponse<CartDto[]>> {
    this.objectIdValidator.validate(userId);
    const keyword: string =
      query.keyword == null ? (query.keyword = '') : query.keyword;
    const page: number = query.page <= 0 ? (query.page = 1) : query.page;
    const pageSize = query.limit < 10 ? (query.limit = 10) : query.page;
    const resPerPage: number = 2;
    const skip: number = resPerPage * (page - 1);
    let filter: {} = {};
    if (keyword != '') {
      filter = {
        title: {
          $regex: keyword,
          $options: 'i',
        },
      };
    }
    const cart = await this.cartModel
      .find({ ...filter, 'user.userId': userId })
      .limit(pageSize)
      .skip(skip)
      .exec();
    if (cart.length <= 0) {
      const response: HttpResponse = {
        message: 'No item in cart.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<CartDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available items in your cart',
      data: cart,
    };
    return response;
  }
}
