import { AuthGuard } from '../../guards/auth.guard';
import { ProductDto } from '../../services/product/Dto/product.dto';
import { UpdateProductDto } from './../../services/product/Dto/update-product.dto';
import { HttpResponse } from './../../data/Dtos/http.response.dto';
import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { CreateProductDto } from '../../services/product/Dto/create-product.dto';
import { ProductService } from 'src/services/product/product.service';
import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/new')
  @UseGuards(AuthGuard)
  async addProduct(
    @Body() model: CreateProductDto,
  ): Promise<HttpResponse<CreateProductDto>> {
    return await this.productService.addProductAsync(model);
  }

  @ApiParam({
    name: 'id',
    required: true,
    example: '635860aee5c0d190913722de',
    description: 'User id to update',
  })
  @Post('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() model: UpdateProductDto,
  ): Promise<HttpResponse<UpdateProductDto>> {
    return await this.productService.updateProductAsync(id, model);
  }

  @ApiParam({
    name: 'id',
    required: true,
    example: '635860aee5c0d190913722de',
    description: 'User id to update',
  })
  @Patch('/update/:id')
  async updateProd(
    @Param('id') id: string,
    @Body() model: UpdateProductDto,
  ): Promise<HttpResponse<UpdateProductDto>> {
    return await this.productService.updateProdAsync(id, model);
  }

  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'get product by title.',
    example: 'kelly',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'How many product to return pair page.',
    example: 2,
  })
  @Get('/get-products')
  async findAllProducts(
    @Query() query: RequestQuery,
  ): Promise<HttpResponse<ProductDto[]>> {
    return await this.productService.findAllProductsAsync(query);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'get product by id.',
    example: '635860aee5c0d190913722de',
  })
  @Get('/:id')
  async findProduct(
    @Param('id') id: string,
  ): Promise<HttpResponse<ProductDto>> {
    return await this.productService.findProductAsync(id);
  }

  @Delete('delete')
  async deleteProduct(
    @Query('id') id: string,
  ): Promise<HttpResponse<ProductDto>> {
    return await this.productService.deleteProductAsync(id);
  }
}
