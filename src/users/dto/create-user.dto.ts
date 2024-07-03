import { IsDate, IsEmail, IsNotEmpty, IsUrl, Max, Min } from 'class-validator';

export class CreateUserDto {
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

  @Min(2)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsDate()
  updatedAt: string;
}
