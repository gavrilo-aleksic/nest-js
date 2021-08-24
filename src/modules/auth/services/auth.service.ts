import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
