import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/modules/auth/models/user.dto';
import { UserModel } from 'src/modules/auth/models/user.model';
import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth' })
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('create')
  async createUser(@Body() user: UserDTO): Promise<UserModel> {
    const newUser = new UserModel(user.username, user.password);
    const createdUser = await this.authService.createUser(newUser);
    return createdUser;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    return request.user;
  }
}
