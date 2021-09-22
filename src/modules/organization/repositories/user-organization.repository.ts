import { UserOrganizationRepository } from 'src/modules/auth/repositories/user-organization.repository';
import { createMockOrganization } from 'src/test/mocks/models/organization.mock';

export const userOrganizationRepositoryMockFactory: () => UserOrganizationRepository =
  () => ({
    entity: UserOrganizationRepository,
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
