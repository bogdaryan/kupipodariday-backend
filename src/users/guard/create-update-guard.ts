import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { ERR_MESSAGES } from '../../constants/error-messages';

@Injectable()
export class CreateUpdateUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { username, email } = req.body;

    const user = await this.usersService.find({
      where: [{ username }, { email }],
    });

    if (user) {
      if (user.username === username) {
        throw new BadRequestException(ERR_MESSAGES.usernameExist);
      } else if (user.email === email) {
        throw new BadRequestException(ERR_MESSAGES.emailExist);
      }
    }

    return true;
  }
}
