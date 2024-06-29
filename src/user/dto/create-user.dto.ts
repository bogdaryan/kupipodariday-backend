import { IsEmail, IsNotEmpty, IsUrl, Max, Min } from 'class-validator';

export class CreateUserDto {
  @Min(1)
  @Max(64)
  @IsNotEmpty()
  username: string;

  @Min(0)
  @Max(200)
  about: string;

  @IsUrl()
  @IsNotEmpty()
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Min(2)
  @IsNotEmpty()
  password: string;
}
