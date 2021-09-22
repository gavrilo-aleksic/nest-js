import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/@types/api';
import { UserModel } from 'src/modules/auth/models/user.model';
import { Routes } from 'src/routes';
import { Exceptions } from 'src/shared/errors/error-exceptions';
import { UpdateUserDTO, CreateUserDTO } from '../models/user.dto';
import { AuthService } from '../services/auth.service';

@Controller({ path: Routes.auth.root })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(Routes.auth.register)
  async createUser(@Body() user: CreateUserDTO): Promise<UserModel> {
    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post(Routes.auth.login)
  async login(@Request() request: any) {
    return this.authService.createAccessToken(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(Routes.auth.profile)
  async getMe(@Request() request: any, @Param('id') userId: number) {
    if (userId !== undefined && isNaN(userId)) {
      throw Exceptions.auth.InvalidUserIdParam(userId);
    }
    return this.authService.getUser(userId || request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUser(@Request() request: IRequest, @Body() user: UpdateUserDTO) {
    return this.authService.updateUser(user, request.user);
  }
}
