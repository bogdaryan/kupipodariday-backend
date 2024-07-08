import { Injectable } from '@nestjs/common';
import { Wishlists } from '../entities/wishlists.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { User } from '../entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import { UpdateWishlistDto } from './dto/update-wishlist-dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlists)
    private wishlistsRepository: Repository<Wishlists>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateWishlistDto, user: User) {
    const { itemsId, image, name } = createOfferDto;

    const wishes = await this.wishesService.find({
      where: { id: In(itemsId) },
    });

    return await this.wishlistsRepository.save({
      name,
      image,
      owner: user,
      items: wishes,
    });
  }

  async findOne(options: FindManyOptions<Wishlists>) {
    return await this.wishlistsRepository.findOneOrFail(options);
  }

  async find(options: FindManyOptions<Wishlists>) {
    return await this.wishlistsRepository.find(options);
  }

  async delete(options: FindManyOptions<Wishlists>) {
    const wishlist = await this.findOne(options);
    return await this.wishlistsRepository.remove(wishlist);
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const { itemsId, image, name } = updateWishlistDto;

    const wishlist = await this.wishlistsRepository.findOneOrFail({
      where: { id },
      relations: { items: true },
    });

    wishlist.name = name || wishlist.name;
    wishlist.image = image || wishlist.image;

    if (itemsId) {
      const wishes = await this.wishesService.find({
        where: { id: In(itemsId) },
      });

      wishlist.items = wishes;
    }

    return await this.wishlistsRepository.save(wishlist);
  }
}
