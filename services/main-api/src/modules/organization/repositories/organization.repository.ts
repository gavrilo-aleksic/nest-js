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
      .innerJoin(
        'organization.users',
        'userOrganization',
        'userOrganization.userId = :userId',
        { userId },
      )
      .orderBy('organization.createdAt')
      .getMany();
  }

  async getOne(id: number, userId?: number) {
    return (await this.getRepository())
      .createQueryBuilder('organization')
      .innerJoin(
        'organization.users',
        'userOrganization',
        'userOrganization.userId = :userId AND userOrganization.organizationId = :id',
        { userId, id },
      )
      .getOne();
  }
}
