import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from './wish.entity';
import { Offer } from './offers.entity';
import { Wishlists } from './wishlists.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @Column()
  @Length(0, 200)
  @IsOptional()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @Min(2)
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @ManyToMany(() => Offer, (offer) => offer.user)
  @JoinTable()
  offers: Offer[];

  @ManyToMany(() => Wishlists, (wishlists) => wishlists.items)
  @JoinTable()
  wishlists: Wishlists[];

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
