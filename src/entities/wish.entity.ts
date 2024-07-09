import { IsDate, IsInt, IsNotEmpty, IsUrl, Length } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Offer } from './offers.entity';
import { Wishlists } from './wishlists.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ default: 0 })
  @IsNotEmpty()
  @IsInt()
  copied: number;

  @Column({ nullable: true })
  originalWishId: number;

  @Column({ default: 0 })
  @IsNotEmpty()
  @IsInt()
  raised: number;

  @Column()
  @Length(1, 1024)
  @IsNotEmpty()
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item, { cascade: true })
  @JoinTable()
  offers: Offer[];

  @ManyToOne(() => Wishlists, (wishlists) => wishlists.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wishlists: Wishlists;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
