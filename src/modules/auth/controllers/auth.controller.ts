import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { UserModel } from 'src/modules/auth/models/user.model';
import { UserDTO } from '../models/user.dto';
import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth' })
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('create')
  async createUser(@Body() user: UserDTO): Promise<UserModel> {
    const newUser = new UserModel(user.username, user.password);
    return this.authService.createUser(newUser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request: IRequest) {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() request: IRequest) {
    return request.user;
  }
}
