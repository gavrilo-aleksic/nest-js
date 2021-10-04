import api from './api';

export const loginUser = async (username: string, password: string) => {
  const result = await api.login(username, password);
  if (result.accessToken) {
    localStorage.setItem('jwt', result.accessToken);
    return Promise.resolve(result.accessToken);
  } else {
    return Promise.reject(result);
  }
};

export const isLoggedIn = () => !!localStorage.getItem('jwt');

export const logout = async () => {
  localStorage.removeItem('jwt');
  window.location.href = 'http://localhost:3001/login';
};

export const fetchUserProfile = async () => {
  return api.getUserProfile().then((result) => ({
    username: result.username,
    id: result.id,
    createdAt: new Date(result.createdAt),
    updatedAt: new Date(result.updatedAt),
    selectedOrganization: result.selectedOrganization
      ? {
          name: result.selectedOrganization.name,
          id: result.selectedOrganization.id,
          createdAt: new Date(result.selectedOrganization.createdAt),
          updatedAt: new Date(result.selectedOrganization.updatedAt),
        }
      : null,
  }));
};
