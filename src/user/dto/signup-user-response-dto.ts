import { IsDate, IsEmail, IsNotEmpty, IsUrl, Max, Min } from 'class-validator';

export class SignupUserResponseDto {
  @IsNotEmpty()
  id: string;

  @Min(1)
  @Max(64)
  @IsNotEmpty()
  username: string;

  @Min(0)
  @Max(200)
  about: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsDate()
  updatedAt: string;
}
