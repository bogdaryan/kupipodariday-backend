import { IsNotEmpty, IsUrl, Length } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Offer } from './offers.entity';
import { Wishlists } from './wishlists.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @Column()
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  raised: string;

  @Column()
  @Length(1, 1024)
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => Offer, (offer) => offer.user)
  @JoinTable()
  offers: Offer[];

  @ManyToMany(() => Wishlists, (wishlist) => wishlist.items)
  wishlists: Wishlists[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
