import { FindManyOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashValue } from '../utils/hash';

@Injectable()
export class UsersService {
  secretKey: string;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.secretKey = this.configService.get<string>('jwt.secret');
  }

  async findOne(options: FindManyOptions<User>) {
    return this.usersRepository.findOneOrFail(options);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await hashValue(password),
    });

    return this.usersRepository.save(newUser);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: { password: true, username: true, id: true },
    });

    return user;
  }

  async update(options: FindManyOptions<User>, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(options);

    if (updateUserDto.password) {
      updateUserDto.password = await hashValue(updateUserDto.password);
    }

    return await this.usersRepository.save({ ...user, ...updateUserDto });
  }
}
