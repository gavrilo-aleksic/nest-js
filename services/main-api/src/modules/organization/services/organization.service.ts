import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/@types/api';
import { UserOrganizationModel } from 'src/modules/auth/models/user-organization.model';
import { UserOrganizationRepository } from 'src/modules/auth/repositories/user-organization.repository';
import { Exceptions } from 'src/shared/errors/error-exceptions';
import { SQL_ERROR_CODES } from 'src/shared/utils/sql.utils';
import { OrganizationPostDTO } from '../models/organization.dto';
import { OrganizationModel } from '../models/organization.model';
import { OrganizationRepository } from '../repositories/organization.repository';

@Injectable()
export class OrganizationService {
  constructor(
    private organizationRepository: OrganizationRepository,
    private userOrganizationRepository: UserOrganizationRepository,
  ) {}

  async getAll(userId: number, pagination?: IPagination) {
    return this.organizationRepository.getAll(userId, pagination);
  }

  async getOne(id: number, userId: number) {
    const organization = await this.organizationRepository.getOne(id, userId);
    if (!organization) {
      throw Exceptions.organization.NotFoundException(id);
    }
    return organization;
  }

  async create(organization: OrganizationPostDTO, user: IJWT) {
    const newOrganization = new OrganizationModel(
      organization.name,
      organization.displayName,
    );
    const createdOrganization = await this.organizationRepository.save(
      newOrganization,
    );
    const relation = UserOrganizationModel.createUserOrganization(
      user.sub,
      createdOrganization.id,
      true,
    );
    await this.userOrganizationRepository.save(relation);
    return createdOrganization;
  }

  async update(id: number, userId: number, organization: OrganizationPostDTO) {
    const existingOrganization = await this.organizationRepository.getOne(
      id,
      userId,
    );
    if (!existingOrganization) {
      throw Exceptions.organization.NotFoundException(id);
    }
    const result = await this.organizationRepository.save({
      ...existingOrganization,
      ...organization,
      id,
    });
    return result;
  }

  async isUserOnOrganization(
    user: IJWT,
    organizationId: number,
  ): Promise<boolean> {
    if (organizationId && user.selectedOrganizationId !== organizationId) {
      const organization = await this.organizationRepository.getOne(
        organizationId,
        user.sub,
      );
      if (!organization) {
        return false;
      }
    }
    return true;
  }

  async delete(userId: number, id: number) {
    const existingOrganization = await this.organizationRepository.getOne(
      id,
      userId,
    );
    if (!existingOrganization) {
      throw Exceptions.organization.NotFoundException(id);
    }
    try {
      await this.organizationRepository.deleteById(id);
    } catch (e) {
      if (e.code === SQL_ERROR_CODES.FOREIGN_KEY_CONSTRAINT()) {
        throw Exceptions.organization.LinkedToUser(id);
      }
    }
  }
}
