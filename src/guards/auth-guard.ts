import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    let user;

    try {
      user = this.jwtService.verify(token);
    } catch (_) {
      return false;
    }

    request.locals.user = user;

    return true;
  }
}
