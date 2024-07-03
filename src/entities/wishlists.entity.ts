import { IsNotEmpty, IsUrl, Length } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from './wish.entity';

@Entity()
export class Wishlists {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @Column()
  @Length(0, 1500)
  @IsNotEmpty()
  description: string;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  items: Wish[];
}
