import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class ProductCartDto {
  @ApiProperty({
    description: 'Id of the product you adding to cart.',
    example: '635860aee5c0d190913722de',
  })
  @Prop({ index: true, type: Types.ObjectId })
  productId: string;

  @ApiProperty({
    description: 'The product title',
    example: 'Fried Rice and Chicken',
  })
  title: string;

  @ApiProperty({ description: 'The product price', example: 8000 })
  price: number;

  @ApiProperty({
    description: 'The product img',
    example:
      'https://th.bing.com/th/id/R.7722757a6904846dfc48c94b6356c0fb?rik=eBmkmiXMJcl7yA&riu=http%3a%2f%2fgfb.global.ssl.fastly.net%2fwp-content%2fuploads%2f2015%2f01%2fplantains.png&ehk=Nbf%2bVVvrHjHilKTAlcGLRBHFS2VKneli8Fuu7FGrWOw%3d&risl=&pid=ImgRaw&r=0',
  })
  img: string;

  @ApiProperty({
    description: 'The product price',
    example: 'Sweet Fried Rice with Chicken',
  })
  desc: string;
}
