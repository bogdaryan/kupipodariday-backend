import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from '../auth/guard/auth-guard';
import { User } from '../entities/user.entity';
import { AuthUser } from '../utils/user.decorator';
import { EntityNotFoundExceptionFilter } from '../exception/exception-filter';
import { CheckAmountPipe } from './pipe/check-amount-pipe';
import { ValidatedOfferDto } from './dto/validated-offer.dto';

@UseFilters(EntityNotFoundExceptionFilter)
@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UsePipes(CheckAmountPipe)
  @Post()
  async create(@Body() body: ValidatedOfferDto, @AuthUser() user: User) {
    return await this.offersService.create(body, user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    return await this.offersService.findOne({ where: { id } });
  }

  @Get()
  async find() {
    return await this.offersService.find({});
  }
}
