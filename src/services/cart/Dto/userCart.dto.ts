import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserCartDto {
  @ApiProperty({
    description: 'User Id of the user adding to cart.',
    example: '635860aee5c0d190913722de',
  })
  @Prop({ index: false })
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
