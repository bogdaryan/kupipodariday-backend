import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { WishesService } from '../wishes.service';

@Injectable()
export abstract class BaseWishGuard implements CanActivate {
  constructor(protected readonly wishesService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const userId = req.user['id'];
    const wishId = Number(req.params.id);

    const wish = await this.wishesService.findOne({
      where: { id: wishId },
      relations: { owner: true },
    });

    if (!this.checkCondition(wish.owner.id, userId)) {
      throw new BadRequestException(this.getErrorMessage());
    }

    return true;
  }

  abstract checkCondition(wishOwnerId: number, userId: number): boolean;
  abstract getErrorMessage(): string;
}
