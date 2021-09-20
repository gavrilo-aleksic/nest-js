import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from 'src/modules/auth/models/user.model';
import { UserDTO } from '../models/user.dto';
import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  async createUser(@Body() user: UserDTO): Promise<UserModel> {
    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() request: any) {
    return request.user;
  }
}
