import { Injectable } from '@nestjs/common';
import { ERR_MESSAGES } from '../../constants/error-messages';
import { BaseWishlistGuard } from './base-wishlist-guard';
import { In } from 'typeorm';

@Injectable()
export class UpdateWishlistGuard extends BaseWishlistGuard {
  getErrorMessage(): string {
    return ERR_MESSAGES.forrbidenUpdate;
  }
}
