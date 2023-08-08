import { multerUsersOptions } from './../../config/multer/multer.user.config';
import { multerProductOptions } from './../../config/multer/multer.product.config';
import { HttpResponse } from 'src/data/Dtos/http.response.dto';
import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FileUpload')
@Controller('uploads')
export class AppController {
  @Get('products/:path')
  seeUserImage(@Param('path') imgPath: string, @Res() res: Response) {
    try {
      const readStream = createReadStream(
        join(__dirname, '../../..', 'uploads/products', imgPath),
      );
      readStream.pipe(res);
    } catch (error) {
      return error;
    }
  }

  @Get('users/:path')
  seeUploadedFile(@Param('path') imgPath: string, @Res() res: Response) {
    try {
      const readStream = createReadStream(
        join(__dirname, '../../..', 'uploads/users', imgPath),
      );
      readStream.pipe(res);
    } catch (error) {
      return error;
    }
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', multerProductOptions))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    const response: HttpResponse<{ ImgPath: string }> = {
      statusCode: HttpStatus.OK,
      message: 'File upload successful',
      data: {
        ImgPath: `${process.env.SERVER_URL}/${file.path}`,
      },
    };
    return response;
  }

  @Post('user')
  @UseInterceptors(FileInterceptor('file', multerUsersOptions))
  uploadUsersImage(@UploadedFile() file: Express.Multer.File) {
    const response: HttpResponse<{ ImgPath: string }> = {
      statusCode: HttpStatus.OK,
      message: 'File upload successful',
      data: {
        ImgPath: `${process.env.SERVER_URL}/${file.path}`,
      },
    };
    return response;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('pass-validation')
  uploadFileAndPassValidation(
    @Body() body: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      body,
      file: file?.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('fail-validation')
  uploadFileAndFailValidation(
    @Body() body: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
