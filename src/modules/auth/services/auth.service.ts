import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { IApiUser } from '../auth.types';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

  async createUser(user: UserModel) {
    return this.userRepository.create(user);
  }

  async validateUser(username: string, pass: string): Promise<Partial<UserModel>> {
    const user = await this.userRepository.findByUsername(username);
    if (user && user.encPassword === pass) {
      const { encPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IApiUser) {
    const payload = {username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload)
    } 
  }
}
