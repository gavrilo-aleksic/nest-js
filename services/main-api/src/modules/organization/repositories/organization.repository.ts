import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/@types/api';
import { Repository } from 'src/shared/repository';
import { OrganizationModel } from '../models/organization.model';

@Injectable()
export class OrganizationRepository extends Repository<OrganizationModel> {
  constructor() {
    super(OrganizationModel);
  }

  async getAll(userId: number, pagination?: IPagination) {
    return (await this.getRepository())
      .createQueryBuilder('organization')
      .innerJoin(
        'organization.users',
        'userOrganization',
        'userOrganization.userId = :userId',
        { userId },
      )
      .orderBy('organization.createdAt', 'DESC')
      .take(pagination?.pageSize || 30)
      .skip(pagination?.pageNumber || 0)
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
