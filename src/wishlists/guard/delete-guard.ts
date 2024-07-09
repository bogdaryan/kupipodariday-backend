import { Injectable } from '@nestjs/common';
import { ERR_MESSAGES } from '../../constants/error-messages';
import { BaseWishlistGuard } from './base-wishlist-guard';

@Injectable()
export class DeleteWishlistGuard extends BaseWishlistGuard {
  getErrorMessage(): string {
    return ERR_MESSAGES.forrbidenDelete;
  }
}
