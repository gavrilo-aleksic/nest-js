import { createMockOrganization } from 'src/test/mocks/models/organization.mock';
import { OrganizationModel } from '../models/organization.model';
import { OrganizationRepository } from './organization.repository';

export const organizationRepositoryMockFactory: () => OrganizationRepository =
  () => ({
    entity: OrganizationModel,
    repository: null,
    save: () => Promise.resolve(null),
    query: () => Promise.resolve(null),
    getRepository: () => Promise.resolve(null),
    saveMany: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    deleteById: () => Promise.resolve(null),
    getOne: (id: number) => Promise.resolve(createMockOrganization({ id })),
    getAll: () => Promise.resolve([createMockOrganization()]),
  });
