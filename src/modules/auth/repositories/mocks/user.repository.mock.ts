import { createMockUser } from 'src/test/mocks/models/user.mock';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../user.repository';

export const userRepositoryMockFactory: () => UserRepository = () => ({
  entity: UserModel,
  repository: null,
  save: (user: UserModel) => Promise.resolve(createMockUser({ ...user })),
  query: () => Promise.resolve(null),
  getRepository: () => Promise.resolve(null),
  saveMany: () => Promise.resolve(null),
  update: () => Promise.resolve(null),
  deleteById: () => Promise.resolve(null),
  findByUsername: (username: string) =>
    Promise.resolve(createMockUser({ username })),
  getOne: (id: number) => Promise.resolve(createMockUser({ id })),
});
