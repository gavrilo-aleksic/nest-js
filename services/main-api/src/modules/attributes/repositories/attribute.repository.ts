import { Repository } from 'src/shared/repository';
import { AttributeModel } from '../models/attribute.model';

export class AttributeRepository extends Repository<AttributeModel> {
  constructor() {
    super(AttributeModel);
  }

  async getAll(organizationId: number) {
    return (await this.getRepository()).find({
      where: { organization: { id: organizationId } },
    });
  }
}
