import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ObjectIdValidator {
  public validate(id: string): void {
    const isValidId: boolean = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid Object Id');
    }
  }
}
