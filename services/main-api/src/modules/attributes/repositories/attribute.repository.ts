import { IPagination } from 'src/@types/api';
import { Repository } from 'src/shared/repository';
import { AttributeModel } from '../models/attribute.model';

export class AttributeRepository extends Repository<AttributeModel> {
  constructor() {
    super(AttributeModel);
  }

  async getAll(organizationId: number, pagination?: IPagination) {
    return (await this.getRepository()).find({
      where: { organization: { id: organizationId } },
      take: pagination?.pageSize || 30,
      skip: pagination?.pageNumber || 0,
    });
  }
}
