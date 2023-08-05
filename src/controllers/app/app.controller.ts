import { HttpResponse } from 'src/data/Dtos/http.response.dto';
import { AppService } from '../../services/cart/app/app.service';
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

@Controller()
export class AppController {
  @Get('uploads/:path')
  seeUploadedFile(@Param('path') imgPath: string, @Res() res: Response) {
    try {
      const readStream = createReadStream(
        join(__dirname, '../../..', 'uploads', imgPath),
      );
      readStream.pipe(res);
    } catch (error) {
      return error;
    }
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
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
  @Post('file/pass-validation')
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
  @Post('file/fail-validation')
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
