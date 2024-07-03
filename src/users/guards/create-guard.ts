import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { ERR_MESSAGES } from '../../constants/error-messages';

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username } = request.body;

    const user = await this.usersService.findByUsername(username);

    if (user) {
      throw new BadRequestException(ERR_MESSAGES.userExist);
    }

    return true;
  }
}
