import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { UserModel } from 'src/modules/auth/models/user.model';
import { UpdateUserDTO, UserDTO } from '../models/user.dto';
import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUser(@Request() request: IRequest, @Body() user: UpdateUserDTO) {
    return this.authService.updateUser(user, request.user);
  }
}
