import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserCartDto {
  @ApiProperty({
    description: 'User Id of the user adding to cart.',
    example: '635860aee5c0d190913722de',
  })
  @Prop({ index: true, type: Types.ObjectId })
  userId: string;

  @ApiProperty({
    description: 'Username of the user adding to cart.',
    example: 'kelly',
  })
  username: string;

  @ApiProperty({
    description: 'Country of the user adding to cart.',
    example: 'user country',
  })
  country: string;
}
