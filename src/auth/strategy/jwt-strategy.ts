import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT_KEY,
    });
  }

  validate(jwtPayload: { id: number }) {
    const user = this.usersService.findOne({ where: { id: jwtPayload.id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
