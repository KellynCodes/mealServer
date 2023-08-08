import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const imagePath = join(__dirname, '../..', req.originalUrl);
    if (!existsSync(imagePath)) {
      res.status(404).send({ message: 'Image not found' });
    } else {
      next();
    }
  }
}
