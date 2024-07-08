import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Offer } from '../entities/offers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ValidatedOfferDto } from './dto/validated-offer.dto';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createOfferDto: ValidatedOfferDto, user: User) {
    const { amount, wish, itemId } = createOfferDto;

    wish.raised += amount;
    await this.wishesService.update(itemId, { raised: wish.raised });

    return await this.offerRepository.save({
      amount,
      user,
      item: wish,
    });
  }

  async findOne(options: FindManyOptions<Offer>) {
    return await this.offerRepository.findOneOrFail(options);
  }

  async find(options: FindManyOptions<Offer>) {
    return await this.offerRepository.find(options);
  }
}
