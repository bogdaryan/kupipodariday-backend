import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

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
    const { password, ...data } = createUserDto;
    const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const newUser = this.usersRepository.create({
      password: hashPassword,
      ...data,
    });

    return this.usersRepository.save(newUser);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    return user;
  }
}
