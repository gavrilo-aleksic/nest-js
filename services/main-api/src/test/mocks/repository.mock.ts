import { Repository } from 'src/shared/repository';

export const repositoryMockFactory: <T>(entity: T) => Repository<T> = (
  entity: any,
) => ({
  entity,
  repository: null,
  save: () => Promise.resolve(null),
  query: () => Promise.resolve(null),
  getRepository: () => Promise.resolve(null),
  saveMany: () => Promise.resolve(null),
  update: () => Promise.resolve(null),
  deleteById: () => Promise.resolve(null),
});
