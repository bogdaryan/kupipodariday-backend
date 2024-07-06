import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create.dto';
import { User } from '../entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import { ERR_MESSAGES } from '../constants/error-messages';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User) {
    const { amount, itemId } = createOfferDto;
    const wish = await this.wishesService.findOne({ where: { id: itemId } });

    const raised = wish.raised + amount;

    if (raised > amount) {
      throw new BadRequestException({
        messages: ERR_MESSAGES.tooMuchMoney,
        paised: raised,
        price: wish.price,
      });
    }

    wish.raised += amount;

    await this.wishesService.update(itemId, { raised });

    return await this.offerRepository.save({
      ...createOfferDto,
      amount,
      user,
      item: wish,
    });
  }
}
