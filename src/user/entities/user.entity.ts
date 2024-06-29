import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @Min(2)
  @IsNotEmpty()
  password: string;
}
