import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/modules/auth/models/user.dto';
import { UserModel } from 'src/modules/auth/models/user.model';

@Controller({ path: 'auth' })
export class AuthController {
  @Post()
  async createUser(@Body() user: UserDTO): Promise<UserModel> {
    const newUser = new UserModel(user.username, user.password);
    return newUser;
  }
}
