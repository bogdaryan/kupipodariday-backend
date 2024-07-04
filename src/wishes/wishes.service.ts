import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { JwtGuard } from '../auth/guard/auth-guard';
import { CreateWishDto } from './dto/create-wish-dto';
import { UpdateWishDto } from './dto/update-wish-dto';

@UseGuards(JwtGuard)
@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, userId) {
    const newWish = await this.wishRepository.create({
      ...createWishDto,
      owner: userId,
    });

    return await this.wishRepository.save(newWish);
  }

  async findLatest(options: FindManyOptions<Wish>) {
    return this.wishRepository.find(options);
  }

  async findTop(options: FindManyOptions<Wish>) {
    return this.wishRepository.find(options);
  }

  async find(options: FindManyOptions<Wish>) {
    return await this.wishRepository.find(options);
  }

  async findOne(options: FindManyOptions<Wish>): Promise<Wish> {
    return await this.wishRepository.findOneOrFail(options);
  }

  async removeOne(options: FindManyOptions<Wish>) {
    const wish = await this.wishRepository.findOneOrFail(options);
    return await this.wishRepository.remove(wish);
  }

  async update(options: FindManyOptions<Wish>, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne(options);

    // if (updateWishDto.raised) {
    //   return;
    // }

    return await this.wishRepository.save({ ...wish, ...updateWishDto });
  }
}
