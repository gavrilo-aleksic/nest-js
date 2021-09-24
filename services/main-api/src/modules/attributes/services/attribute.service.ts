import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from 'src/modules/organization/repositories/organization.repository';
import { Exceptions } from 'src/shared/errors/error-exceptions';
import { CreateAttributeDTO } from '../models/attribute.dto';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributeService {
  constructor(
    private attributeRepository: AttributeRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async getAll(organizationId: number) {
    return this.attributeRepository.getAll(organizationId);
  }

  async create(
    user: IJWT,
    organizationId: number,
    attribute: CreateAttributeDTO,
  ) {
    let selectedOrganizationId = await this.getOrganizationId(
      user,
      organizationId,
    );
  }

  async getOrganizationId(user: IJWT, organizationId: number) {
    let organizationToFilterId = user.selectedOrganizationId;
    if (organizationId && user.selectedOrganizationId !== organizationId) {
      const organization = await this.organizationRepository.getOne(
        organizationId,
        user.sub,
      );
      if (!organization) {
        throw Exceptions.organization.NotFoundException(organizationId);
      }
      organizationToFilterId = organizationId;
    }
    return organizationToFilterId;
  }
}
