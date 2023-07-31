import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { CartService } from './../../services/cart/cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '../../data/Dtos/http.response.dto';
import { CartDto } from '../../services/cart/Dto/addToCart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add')
  async add(@Body() model: CartDto): Promise<HttpResponse<CartDto>> {
    return this.cartService.addAsync(model);
  }

  @ApiParam({
    name: 'productId',
    required: true,
    description: 'delete product by productId.',
    example: '635860aee5c0d190913722de',
  })
  @Delete('/:productId')
  async delete(@Param('productId') productId: string): Promise<HttpResponse> {
    return this.cartService.removeCartAsync(productId);
  }

  @ApiParam({
    name: 'userId',
    required: true,
    description: 'get cart item by userId.',
    example: '635860aee5c0d190913722de',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'How many cart to return pair page.',
    example: 2,
  })
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'How many cart to return pair page.',
    example: 2,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'How many cart to return pair page.',
    example: 20,
  })
  @Get('/:userId')
  async getUserCart(
    @Param('userId') userId: string,
    @Query() query: RequestQuery,
  ): Promise<HttpResponse<CartDto[]>> {
    return this.cartService.getUsersCartAsync(userId, query);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'get product by id.',
    example: '635860aee5c0d190913722de',
  })
  @Get('/:id')
  async getCart(@Param('id') id: string): Promise<HttpResponse<CartDto>> {
    return this.cartService.getCartAsync(id);
  }

  @ApiQuery({
    name: 'page',
    required: false,
    description: 'How many cart to return pair page.',
    example: 2,
  })
  @Get('/cart-items')
  async getAllCartItem(
    @Query() query: RequestQuery,
  ): Promise<HttpResponse<CartDto[]>> {
    return this.cartService.getCartsAsync(query);
  }
}
