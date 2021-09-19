import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async createUser(user: UserModel) {
    return this.userRepository.create(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne(username);
    if (user && user.encPassword === pass) {
      const { encPassword, ...result } = user;
      return result;
    }
    return null;
  }
}
