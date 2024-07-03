import { IsBoolean, IsNotEmpty, IsUrl } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => User, (user) => user.offers)
  user: User;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  item: string;

  @Column()
  @IsNotEmpty()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
