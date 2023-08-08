import { ObjectIdValidator } from './../../utils/validate.objectId';
import { UpdateProductDto } from './Dto/update-product.dto';
import { ProductDto } from './Dto/product.dto';
import { HttpResponse } from './../../data/Dtos/http.response.dto';
import { RequestQuery } from './../../data/Dtos/request.query.dto';
import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { Product } from '../../data/models/product';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './Dto/create-product.dto';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private objectIdValidator: ObjectIdValidator,
  ) {}

  async addProductAsync(
    model: CreateProductDto,
  ): Promise<HttpResponse<CreateProductDto>> {
    let product = await this.productModel.findOne({ title: model.title });
    if (product != null) {
      throw new BadRequestException('Product already exist');
    }
    product = await this.productModel.create(model);

    const response: HttpResponse<ProductDto> = {
      message: `${product.title} has been added.`,
      statusCode: HttpStatus.OK,
      data: product,
    };
    return response;
  }

  async updateProductAsync(
    id: string,
    model: UpdateProductDto,
  ): Promise<HttpResponse<UpdateProductDto>> {
    this.objectIdValidator.validate(id);

    let product = await this.productModel.findById(id).exec();
    if (product == null) {
      throw new BadRequestException('Product not found.');
    }

    product = await this.productModel.findByIdAndUpdate(id, model).exec();
    if (product.errors != null) {
      console.log(product.errors.message);
    }

    const response: HttpResponse<ProductDto> = {
      message: `${product.title} was updated.`,
      statusCode: HttpStatus.OK,
      data: product,
    };
    return response;
  }

  async updateProdAsync(
    id: string,
    model: UpdateProductDto,
  ): Promise<HttpResponse<UpdateProductDto>> {
    this.objectIdValidator.validate(id);

    let product = await this.productModel.findById(id).exec();
    if (product == null) {
      throw new BadRequestException('Product not found.');
    }

    product = await this.productModel.findByIdAndUpdate(id, model).exec();
    if (product.errors != null) {
      console.log(product.errors.message);
    }

    const response: HttpResponse<UpdateProductDto> = {
      message: `${product.title} was updated.`,
      statusCode: HttpStatus.OK,
      data: product,
    };
    return response;
  }

  async findProductAsync(id: string): Promise<HttpResponse<ProductDto>> {
    this.objectIdValidator.validate(id);
    const product = await this.productModel.findById(id).exec();
    if (product == null) {
      throw new BadRequestException('Product not found.');
    }

    const response: HttpResponse<ProductDto> = {
      message: `${product.title} was found.`,
      statusCode: HttpStatus.OK,
      data: product,
    };
    return response;
  }

  async findAllProductsAsync(
    query: RequestQuery,
  ): Promise<HttpResponse<ProductDto[]>> {
    const keyword: string =
      query.keyword == null ? (query.keyword = '') : query.keyword;
    const page: number =
      query.page == null ? (query.page = 1) : Number(query.page);
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
    const product = await this.productModel
      .find({ ...filter })
      .limit(10)
      .skip(skip)
      .exec();
    if (product.length <= 0) {
      const response: HttpResponse = {
        message: 'No product found.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<ProductDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available products',
      data: product,
    };
    return response;
  }

  async deleteProductAsync(id: string): Promise<HttpResponse> {
    this.objectIdValidator.validate(id);
    let product = await this.productModel.findById(id).exec();
    if (product == null) {
      throw new BadRequestException('Product not found.');
    }

    product = await this.productModel.findByIdAndDelete(id).exec();
    if (product.errors != null) {
      console.log(product.errors.message);
    }

    const response: HttpResponse = {
      message: `${product.title} was deleted.`,
      statusCode: HttpStatus.OK,
    };
    return response;
  }
}
