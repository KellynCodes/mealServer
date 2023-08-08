import { BadRequestException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerProductOptions: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads/products',
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (
    req: Request,
    file: { mimetype: string },
    cb: (res: BadRequestException, IsValidFileExtension: boolean) => void,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new BadRequestException('Invalid file type!'), false);
    }
  },
};
