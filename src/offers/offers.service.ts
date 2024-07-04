import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: string) {
    const newOffer = await this.offerRepository.create({
      ...createOfferDto,
    });

    return await this.offerRepository.save(newOffer);
  }
}
