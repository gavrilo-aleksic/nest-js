import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/auth/models/user.model';
import { getManager } from 'typeorm';

@Injectable()
export class UserRepository {

  private async getRepository() {
    return getManager().getRepository(UserModel)
  };

  async create(user: UserModel) {
    return (await this.getRepository()).save(user)
  }

  async findOne(username: string): Promise<UserModel | undefined> {
    return undefined
  }
}
