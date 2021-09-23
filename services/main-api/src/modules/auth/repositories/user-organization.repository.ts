import { Injectable } from '@nestjs/common';
import { Repository } from 'src/shared/repository';
import { UserOrganizationModel } from '../models/user-organization.model';

@Injectable()
export class UserOrganizationRepository extends Repository<UserOrganizationModel> {
  constructor() {
    super(UserOrganizationModel);
  }
}
