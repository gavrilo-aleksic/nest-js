import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const getToken = () => localStorage.getItem('jwt');

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

const login = (
  username: string,
  password: string,
): Promise<{ accessToken: string }> =>
  axios
    .post(`${API_BASE_URL}/auth/login`, { username, password })
    .then((e) => e.data);

const getUserProfile = () =>
  axios
    .get(`${API_BASE_URL}/auth/profile`, { headers: getHeaders() })
    .then((e) => e.data);

const getOrganizations = () =>
  axios
    .get(`${API_BASE_URL}/organization`, {
      headers: getHeaders(),
    })
    .then((e) => e.data);

const getAttributes = () =>
  axios
    .get(`${API_BASE_URL}/attribute`, {
      headers: getHeaders(),
    })
    .then((e) => e.data);

const api = {
  login,
  getOrganizations,
  getAttributes,
  getUserProfile,
};

export default api;
