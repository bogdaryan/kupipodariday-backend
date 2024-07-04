import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

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
  item: string;

  @Column()
  @IsNotEmpty()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
