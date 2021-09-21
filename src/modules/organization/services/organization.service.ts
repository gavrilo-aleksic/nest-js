import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationPostDTO } from '../models/organization.dto';
import { OrganizationModel } from '../models/organization.model';
import { OrganizationRepository } from '../repositories/organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async getAll(userId: number) {
    return this.organizationRepository.getAll(userId);
  }

  async getOne(id: number, userId: number) {
    const organization = await this.organizationRepository.getOne(id, userId);
    if (!organization) {
      throw new NotFoundException();
    }
    return organization;
  }

  async create(organization: OrganizationPostDTO) {
    const newOrganization = new OrganizationModel(organization.name);
    return this.organizationRepository.save(newOrganization);
  }

  async update(id: number, userId: number, organization: OrganizationPostDTO) {
    const existingOrganization = await this.organizationRepository.getOne(
      id,
      userId,
    );
    if (!existingOrganization) {
      throw new NotFoundException();
    }
    return this.organizationRepository.save({
      ...existingOrganization,
      ...organization,
    });
  }

  async delete() {}
}
