import { Injectable } from '@nestjs/common';
import { Repository } from 'src/shared/repository';
import { OrganizationModel } from '../models/organization.model';

@Injectable()
export class OrganizationRepository extends Repository<OrganizationModel> {
  constructor() {
    super(OrganizationModel);
  }

  async getAll(userId: number) {
    return (await this.getRepository())
      .createQueryBuilder('organization')
      .innerJoin('organization.users', 'user', 'user.id = :userId', { userId })
      .getMany();
  }

  async getOne(id: number, userId?: number) {
    return (await this.getRepository())
      .createQueryBuilder('organization')
      .innerJoin(
        'organization.users',
        'user',
        'user.id = :userId AND organization.id = :id',
        { userId, id },
      )
      .getOne();
  }
}
