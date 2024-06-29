import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { LocalGuard } from './guard/local-guard';
import { UsersService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);

    return this.authService.auth(await user);
  }
}
