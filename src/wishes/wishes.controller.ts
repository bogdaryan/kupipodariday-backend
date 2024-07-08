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
import { CopyWishGuard } from './guards/copy-guard';
import { UpdateWishGuard } from './guards/update-guard';

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
    return this.wishesService.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  @Get('top')
  findTop() {
    return this.wishesService.find({
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
  delete(@Param('id', ParseIntPipe) id, @AuthUser() user: User) {
    return this.wishesService.delete({
      where: { id, owner: Equal(user.id) },
    });
  }

  @UseGuards(JwtGuard, CopyWishGuard)
  @Post(':id/copy')
  async copy(@Param('id', ParseIntPipe) id, @AuthUser() user: User) {
    return await this.wishesService.copy(id, user);
  }

  @UseGuards(JwtGuard, UpdateWishGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() body: UpdateWishDto) {
    return await this.wishesService.update(id, body);
  }
}
