import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { ERR_MESSAGES } from '../../constants/error-messages';
import { WishlistsService } from '../wishlists.service';
import { Wish } from '../../entities/wish.entity';
import { WishesService } from '../../wishes/wishes.service';
import { In } from 'typeorm';

@Injectable()
export abstract class BaseWishlistGuard implements CanActivate {
  constructor(
    protected readonly wishlistsService: WishlistsService,
    protected readonly wishesService: WishesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const userId = req.user['id'];
    const wishlistId = Number(req.params.id);

    const wishlist = await this.wishlistsService.findOne({
      where: { id: wishlistId },
      relations: { owner: true },
    });

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(this.getErrorMessage());
    }

    return true;
  }

  abstract getErrorMessage(): string;
}
