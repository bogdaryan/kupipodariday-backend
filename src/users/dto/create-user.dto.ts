import { IsEmail, IsNotEmpty, IsUrl, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Length(0, 200)
  about: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(2)
  @IsNotEmpty()
  password: string;
}
