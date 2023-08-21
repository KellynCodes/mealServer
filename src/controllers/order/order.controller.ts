import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { OrderDto } from '../../services/order/dto/order.dto';
import { OrderService } from '../../services/order/order.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from 'src/data/Dtos/http.response.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() model: OrderDto): Promise<HttpResponse<OrderDto>> {
    return await this.orderService.orderAsync(model);
  }

  @Delete()
  async deleteOrder(@Param('id') id: string): Promise<HttpResponse> {
    return this.orderService.deleteOrderAsync(id);
  }

  @ApiQuery({
    name: 'keyword',
    description: 'Like food names',
  })
  @ApiQuery({
    name: 'page',
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    example: 20,
    description: 'How many items to return pair page.',
  })
  @ApiQuery({
    name: 'userId',
    description: 'User id that made the order.',
  })
  @Get('get-all/:userId')
  async getAll(
    @Param('userId') userId: string,
    @Query() query: RequestQuery,
  ): Promise<HttpResponse<OrderDto[]>> {
    return await this.orderService.getAllOrdersAsync(userId, query);
  }
}
