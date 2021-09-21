import { UserModel } from 'src/modules/auth/models/user.model';

export const createMockUser = ({
  username,
  id,
  encPassword,
}: Partial<UserModel> = {}): UserModel => {
  const user = new UserModel(username || 'Test User', 'password');
  user.createdAt = new Date('11-02-1993');
  user.updatedAt = new Date('11-02-1993');
  user.id = id || 1;
  user.encPassword = encPassword || 'password';
  return user;
};
