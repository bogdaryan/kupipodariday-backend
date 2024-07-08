import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { verifyHash } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  auth({ username, id }: User) {
    return { access_token: this.jwtService.sign({ username, id }) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (user && (await verifyHash(password, user.password))) {
      return user;
    }

    return null;
  }
}
