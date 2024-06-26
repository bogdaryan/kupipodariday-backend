import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('me')
  // me(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
  //   const authCookie = request.cookies.authCookie;

  //   // if (isAuthorized(authCookie) {
  //   //   return this.usersService.me();
  //   // }

  //   try {
  //     const token = this.authService.auth();

  //     // устанавливаем куку в ответ на запрос
  //     response.cookie('authCookie', token);
  //   } catch (_) {
  //     throw new ForbiddenException();
  //   }
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
