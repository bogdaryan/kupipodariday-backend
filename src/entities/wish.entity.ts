import { IsDate, IsInt, IsNotEmpty, IsUrl, Length } from 'class-validator';

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

  @Column({ default: 0 })
  @IsNotEmpty()
  @IsInt()
  copied: number;

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

  @ManyToMany(() => Offer, (offer) => offer.user)
  @JoinTable()
  offers: Offer[];

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
