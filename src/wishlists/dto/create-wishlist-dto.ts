import { IsString, IsUrl, Length, IsNotEmpty, IsArray } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsArray()
  @IsNotEmpty()
  itemsId: number[];
}
