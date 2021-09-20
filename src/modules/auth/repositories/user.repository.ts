import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/auth/models/user.model';
import { Repository } from 'src/shared/repository';

@Injectable()
export class UserRepository extends Repository<UserModel> {
  constructor() {
    super(UserModel);
  }

  async findByUsername(username: string): Promise<UserModel | undefined> {
    return (await this.getRepository()).findOne({ username });
  }
}
