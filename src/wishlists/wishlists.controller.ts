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
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from '../auth/guard/auth-guard';
import { AuthUser } from '../utils/user.decorator';
import { User } from '../entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { EntityNotFoundExceptionFilter } from '../exception/exception-filter';
import { UpdateWishlistDto } from './dto/update-wishlist-dto';

@UseFilters(EntityNotFoundExceptionFilter)
@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(@Body() body: CreateWishlistDto, @AuthUser() user: User) {
    return await this.wishlistsService.create(body, user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    return await this.wishlistsService.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });
  }

  @Get()
  async find() {
    return await this.wishlistsService.find({});
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.wishlistsService.delete({ where: { id } });
  }

  @Patch(':id')
  async update(
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.wishlistsService.update(id, updateWishlistDto);
  }
}
