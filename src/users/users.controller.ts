import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guard/auth-guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../utils/user.decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async get(@User() user) {
    return user;
  }

  @Patch('me')
  async update(@User() user, @Body() body: UpdateUserDto) {
    return await this.usersService.update(user.id, body);
  }
}
