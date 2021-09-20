import { Injectable } from '@nestjs/common';
import { Repository } from 'src/shared/repository';
import { OrganizationModel } from '../models/organization.model';

@Injectable()
export class OrganizationRepository extends Repository<OrganizationModel> {
  constructor() {
    super(OrganizationModel);
  }
}
