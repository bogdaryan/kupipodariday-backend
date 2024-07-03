import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalGuard } from './guard/local-guard';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserGuard } from '../users/guards/create-guard';
import { User } from '../utils/user.decorator';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@User() user) {
    return this.authService.auth(user);
  }
  @UseGuards(CreateUserGuard)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.authService.auth(user);
  }
}
