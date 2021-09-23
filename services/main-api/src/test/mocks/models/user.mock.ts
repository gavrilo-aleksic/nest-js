import { UserModel } from 'src/modules/auth/models/user.model';

const defaultPassword = '8d1dde9bc7230e24b8f87e6cb75d5d6a'; // this translates to 'password'

export const createMockUser = ({
  username,
  id,
  encPassword,
}: Partial<UserModel> = {}): UserModel => {
  const user = new UserModel(username || 'Test User', defaultPassword);
  user.createdAt = new Date('11-02-1993');
  user.updatedAt = new Date('11-02-1993');
  user.id = id || 1;
  user.encPassword = encPassword || defaultPassword;
  return user;
};
