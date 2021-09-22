import { UserOrganizationModel } from 'src/modules/auth/models/user-organization.model';
import { OrganizationModel } from 'src/modules/organization/models/organization.model';

export const createUserOrganizationMock = (
  { name, id }: { name?: string; id?: number } = {
    name: 'Test Organization',
    id: 1,
  },
): UserOrganizationModel => {
  const organization = new UserOrganizationModel();
  organization.createdAt = new Date('12-02-1993');
  organization.updatedAt = new Date('13-02-1993');
  return organization;
};

export const createMockOrganization = (
  { name, id }: { name?: string; id?: number } = {
    name: 'Test Organization',
    id: 1,
  },
): OrganizationModel => {
  const organization = new OrganizationModel(name);
  organization.createdAt = new Date('12-02-1993');
  organization.updatedAt = new Date('13-02-1993');
  return organization;
};
