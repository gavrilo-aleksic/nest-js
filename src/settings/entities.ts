import { AttributeModel } from 'src/modules/attributes/models/attribute.model';
import { UserOrganizationModel } from 'src/modules/auth/models/user-organization.model';
import { UserModel } from 'src/modules/auth/models/user.model';
import { EntityAttribute } from 'src/modules/entities/models/entity-attribute.model';
import { EntityTypeModel } from 'src/modules/entities/models/entity-type.model';
import { EntityModel } from 'src/modules/entities/models/entity.model';
import { OrganizationModel } from 'src/modules/organization/models/organization.model';

export const ENTITIES = [
  UserModel,
  OrganizationModel,
  UserOrganizationModel,
  AttributeModel,
  EntityTypeModel,
  EntityModel,
  EntityAttribute,
];
