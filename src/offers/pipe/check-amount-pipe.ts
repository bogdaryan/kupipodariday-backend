import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { WishesService } from '../../wishes/wishes.service';
import { CreateOfferDto } from '../dto/create.dto';
import { ERR_MESSAGES } from '../../constants/error-messages';
import { ValidatedOfferDto } from '../dto/validated-offer.dto';

@Injectable()
export class CheckAmountPipe implements PipeTransform {
  constructor(private readonly wishesService: WishesService) {}

  async transform(body: CreateOfferDto): Promise<ValidatedOfferDto> {
    const { amount, itemId } = body;

    const wish = await this.wishesService.findOne({ where: { id: itemId } });

    const raised = wish.raised + amount;

    if (raised > wish.price) {
      throw new BadRequestException({
        message: ERR_MESSAGES.tooMuchMoney,
        raised: raised,
        price: wish.price,
      });
    }

    return { ...body, wish };
  }
}
