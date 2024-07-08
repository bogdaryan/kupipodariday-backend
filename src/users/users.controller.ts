import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guard/auth-guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../utils/user.decorator';
import { User } from '../entities/user.entity';
import { Equal } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { EntityNotFoundExceptionFilter } from '../exception/exception-filter';

@UseFilters(EntityNotFoundExceptionFilter)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  async get(@AuthUser() user) {
    return user;
  }

  @Patch('me')
  async update(@Body() body: UpdateUserDto, @AuthUser() user: User) {
    return await this.usersService.update({ where: { id: user.id } }, body);
  }

  @Get('/me/wishes')
  async getOwnWishes(@AuthUser() user: User) {
    return await this.wishesService.find({
      where: { owner: Equal(user.id) },
    });
  }

  @Get(':username')
  async findOne(@Param('username') username) {
    return this.usersService.findOne({ where: { username } });
  }

  @Get(':username/wishes')
  async getWishes(@Param('username') username) {
    const user = await this.usersService.findOne({ where: { username } });

    return await this.wishesService.find({
      where: { owner: Equal(user.id) },
    });
  }

  @Post('find')
  async find(@Body() { query: username }) {
    return await this.usersService.findOne({ where: { username } });
  }
}
