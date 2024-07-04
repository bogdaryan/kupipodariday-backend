import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish-dto';
import { AuthUser } from '../utils/user.decorator';
import { User } from '../entities/user.entity';
import { JwtGuard } from '../auth/guard/auth-guard';
import { EntityNotFoundExceptionFilter } from '../exception/exception-filter';
import { Equal } from 'typeorm';
import { UpdateWishDto } from './dto/update-wish-dto';

@UseFilters(EntityNotFoundExceptionFilter)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: CreateWishDto, @AuthUser() { id }: User) {
    return await this.wishesService.create(body, id);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findLatest({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop({
      order: {
        copied: 'DESC',
      },
      take: 10,
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.wishesService.findOne({
      where: { id },
      relations: { owner: true },
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id, @AuthUser() user: User) {
    return this.wishesService.removeOne({
      where: { id, owner: Equal(user.id) },
    });
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Param('id', ParseIntPipe) id, @AuthUser() user: User) {
    const wish = await this.wishesService.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (wish.owner.id === user.id) {
      return;
    }

    const copiedWish = {
      ...wish,
      id: null,
      owner: user,
      copied: wish.copied + 1,
    };

    return await this.wishesService.create(copiedWish, user.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() body: UpdateWishDto,
    @AuthUser() user: User,
  ) {
    return await this.wishesService.update(
      { where: { id, owner: Equal(user.id) } },
      body,
    );
  }
}
