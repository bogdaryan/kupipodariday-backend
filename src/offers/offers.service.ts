import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { Offer } from '../entities/offers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ValidatedOfferDto } from './dto/validated-offer.dto';
import { Wish } from '../entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOfferDto: ValidatedOfferDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { amount, wish, itemId } = createOfferDto;

      wish.raised += amount;
      await queryRunner.manager.update(
        Wish,
        { id: itemId },
        { raised: wish.raised },
      );

      const offer = queryRunner.manager.create(Offer, {
        amount,
        user,
        item: wish,
      });
      await queryRunner.manager.save(Offer, offer);

      await queryRunner.commitTransaction();
      return offer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(options: FindManyOptions<Offer>) {
    return await this.offerRepository.findOneOrFail(options);
  }

  async find(options: FindManyOptions<Offer>) {
    return await this.offerRepository.find(options);
  }
}
