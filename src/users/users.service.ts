import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { ERR_MESSAGES } from '../constants/error-messages';

@Injectable()
export class UsersService {
  secretKey: string;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.secretKey = this.configService.get<string>('jwt.secret');
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const newUser = this.usersRepository.create({
      password: hashPassword,
      ...createUserDto,
    });

    return this.usersRepository.save(newUser);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error(ERR_MESSAGES.userNotFound);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
