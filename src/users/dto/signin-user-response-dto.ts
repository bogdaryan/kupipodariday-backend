import { IsNotEmpty } from 'class-validator';

export class SigninUserResponseDto {
  @IsNotEmpty()
  access_token: string;
}
