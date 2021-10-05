import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/@types/api';
import { CreateAttributeDTO } from '../models/attribute.dto';
import { AttributeModel } from '../models/attribute.model';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributeService {
  constructor(private attributeRepository: AttributeRepository) {}

  async getAll(organizationId: number, pagination?: IPagination) {
    return this.attributeRepository.getAll(organizationId, pagination);
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
