import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { ObjectIdValidator } from './../../utils/validate.objectId';
import { Order } from './../../data/models/order';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/data/Dtos/http.response.dto';
import { OrderDto } from './dto/order.dto';
import { Product } from '../../data/models/product';
import { User } from '../../data/models/user';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Order>,
    private objectValidator: ObjectIdValidator,
  ) {}

  async orderAsync(model: OrderDto): Promise<HttpResponse<OrderDto>> {
    if (model == null) throw new BadRequestException('Payload cannot be empty');
    this.objectValidator.validate(model.userId);
    this.objectValidator.validate(model.product.productId);
    const order = await this.orderModel
      .countDocuments({
        'product.productId': model.product.productId,
        userId: model.userId,
      })
      .exec();
    if (order > 0) {
      throw new BadRequestException('Order has already been placed.');
    }

    const userExist = await this.userModel.findById(model.userId).exec();
    if (!userExist) {
      throw new BadRequestException('User not found.');
    }

    const productExist = await this.productModel
      .findById(model.product.productId)
      .exec();
    if (!productExist) {
      throw new BadRequestException('Product not found.');
    }

    const newOrder = await this.orderModel.create(model);
    const response: HttpResponse<OrderDto> = {
      message: 'Order placed successfully',
      statusCode: HttpStatus.CREATED,
      data: newOrder,
    };
    return response;
  }

  async deleteOrderAsync(id: string): Promise<HttpResponse> {
    this.objectValidator.validate(id);

    let order = await this.orderModel.findById(id).exec();
    if (order == null) {
      throw new BadRequestException('Order not found.');
    }

    order = await this.orderModel.findByIdAndDelete(id).exec();
    const response: HttpResponse = {
      message: 'Order deleted',
      statusCode: HttpStatus.OK,
    };
    return response;
  }

  async getAllOrdersAsync(
    userId: string,
    query: RequestQuery,
  ): Promise<HttpResponse<OrderDto[]>> {
    const skip = (query.page - 1) * Number(query.limit);
    const contact = await this.orderModel
      .find({ userId: userId })
      .skip(skip)
      .limit(query.limit);
    if (contact.length <= 0) {
      const response: HttpResponse = {
        message: 'No contact found.',
        statusCode: HttpStatus.NOT_FOUND,
      };
      return response;
    }
    const response: HttpResponse<OrderDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available messages',
      data: contact,
    };
    return response;
  }
}
