import { Repository } from 'src/shared/repository';
import { AttributeModel } from '../models/attribute.model';

export class AttributeRepository extends Repository<AttributeModel> {
  constructor() {
    super(AttributeModel);
  }
}
