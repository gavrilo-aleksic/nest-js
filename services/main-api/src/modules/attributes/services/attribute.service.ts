import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from 'src/modules/organization/repositories/organization.repository';
import { CreateAttributeDTO } from '../models/attribute.dto';
import { AttributeModel } from '../models/attribute.model';
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

  async create(organizationId: number, attribute: CreateAttributeDTO) {
    const newAttribute = new AttributeModel(
      attribute.name,
      attribute.displayName,
      attribute.type,
      attribute.required,
    );
    return await this.attributeRepository.save(newAttribute);
  }
}
