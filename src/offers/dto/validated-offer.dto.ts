import { Wish } from '../../entities/wish.entity';
import { CreateOfferDto } from './create.dto';

export interface ValidatedOfferDto extends CreateOfferDto {
  wish: Wish;
}
