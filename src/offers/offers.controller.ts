import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create.dto';
import { WishesService } from '../wishes/wishes.service';
import { JwtGuard } from '../auth/guard/auth-guard';
import { User } from '../entities/user.entity';
import { AuthUser } from '../utils/user.decorator';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
  ) {}

  @Post()
  async create(@Body() body: CreateOfferDto, @AuthUser() user: User) {
    return await this.offersService.create(body, user.id);
  }
}
