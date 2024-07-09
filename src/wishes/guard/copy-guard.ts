import { Injectable } from '@nestjs/common';
import { BaseWishGuard } from './base-wish-guard';
import { ERR_MESSAGES } from '../../constants/error-messages';

@Injectable()
export class CopyWishGuard extends BaseWishGuard {
  checkCondition(wishOwnerId: number, userId: number): boolean {
    return wishOwnerId !== userId;
  }

  getErrorMessage(): string {
    return ERR_MESSAGES.cantToCopyOwn;
  }

  async isAlreadyCopied(wishId: number, userId: number): Promise<boolean> {
    const copiedWish = await this.wishesService.find({
      where: { originalWishId: wishId, owner: { id: userId } },
    });

    return !!copiedWish.length;
  }
}
