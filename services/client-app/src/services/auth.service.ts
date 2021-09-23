import { login } from './api';

export const loginUser = async (username: string, password: string) => {
  const result = await login(username, password);
  if (result.accessToken) {
    localStorage.setItem('jwt', result.accessToken);
  }
};
