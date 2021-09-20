import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { hashPassword, validatePassword } from 'src/shared/utils/auth.utils';
import { UserDTO } from '../models/user.dto';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(user: UserDTO) {
    const encPassword = hashPassword(user.password);
    const newUser = new UserModel(user.username, encPassword);
    return this.userRepository.save(newUser);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserModel>> {
    const user = await this.userRepository.findByUsername(username);
    if (user && validatePassword(pass, user.encPassword)) {
      const { encPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserModel) {
    const payload = {
      username: user.username,
      sub: user.id,
      selectedOrganizationId: user.selectedOrganization.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
