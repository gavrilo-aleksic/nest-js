import { Injectable } from '@nestjs/common';
import { CreateAttributeDTO } from '../models/attribute.dto';
import { AttributeModel } from '../models/attribute.model';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributeService {
  constructor(private attributeRepository: AttributeRepository) {}

  async getAll(organizationId: number) {
    return this.attributeRepository.getAll(organizationId);
  }

  async create(organizationId: number, attribute: CreateAttributeDTO) {
    const newAttribute = new AttributeModel(
      organizationId,
      attribute.name,
      attribute.displayName,
      attribute.type,
      attribute.required,
    );
    return await this.attributeRepository.save(newAttribute);
  }
}
