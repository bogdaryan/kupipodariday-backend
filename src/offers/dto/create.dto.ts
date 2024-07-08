import { IsBoolean, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  @IsInt()
  itemId: number;
}
