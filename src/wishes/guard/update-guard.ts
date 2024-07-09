import { Injectable } from '@nestjs/common';
import { BaseWishGuard } from './base-wish-guard';
import { ERR_MESSAGES } from '../../constants/error-messages';

@Injectable()
export class UpdateWishGuard extends BaseWishGuard {
  checkCondition(wishOwnerId: number, userId: number): boolean {
    return wishOwnerId === userId;
  }

  getErrorMessage(): string {
    return ERR_MESSAGES.notYourWish;
  }

  async isAlreadyCopied() {
    return false;
  }
}
