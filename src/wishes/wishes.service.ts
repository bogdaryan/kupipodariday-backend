import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { JwtGuard } from '../auth/guard/auth-guard';
import { CreateWishDto } from './dto/create-wish-dto';
import { UpdateWishDto } from './dto/update-wish-dto';
import { User } from '../entities/user.entity';

@UseGuards(JwtGuard)
@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, userId) {
    return await this.wishRepository.save({
      ...createWishDto,
      owner: userId,
    });
  }

  async find(options: FindManyOptions<Wish>) {
    return await this.wishRepository.find(options);
  }

  async findOne(options: FindManyOptions<Wish>): Promise<Wish> {
    return await this.wishRepository.findOneOrFail(options);
  }

  async delete(options: FindManyOptions<Wish>) {
    const wish = await this.wishRepository.findOneOrFail(options);
    return await this.wishRepository.remove(wish);
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishRepository.update(id, updateWishDto);
  }

  async copy(id: number, user: User) {
    const wish = await this.findOne({
      where: { id },
      relations: { owner: true },
    });

    const copiedWish = {
      ...wish,
      id: null,
      owner: user,
      copied: wish.copied + 1,
    };

    return await this.create(copiedWish, user.id);
  }
}
