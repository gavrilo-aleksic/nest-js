import axios from 'axios';
import { Attribute } from './attributes.service';

const API_BASE_URL = 'http://localhost:3000';

const getToken = () => localStorage.getItem('jwt');

const getHeaders = () => {
  const token = getToken();
  return token ? { Authorization: token } : undefined
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: getHeaders()
});

axiosInstance.interceptors.response.use((request) => (_response: any, error: any) => {
  console.log('GAVRILO', error)
})

const registerUser = (
  username: string,
  password: string,
): Promise<{ accessToken: string }> =>
  axiosInstance
    .post(`/auth/create`, { username, password })
    .then((e) => e.data);

const login = (
  username: string,
  password: string,
): Promise<{ accessToken: string }> =>
  axiosInstance
    .post(`/auth/login`, { username, password })
    .then((e) => e.data);

const getUserProfile = () =>
  axiosInstance
    .get(`/auth/profile`)
    .then((e) => e.data);

const getOrganizations = () =>
  axiosInstance
    .get(`/organization`)
    .then((e) => e.data);

const getAttributes = () =>
  axiosInstance
    .get(`/attribute`)
    .then((e) => e.data);

const createAttribute = (attribute: Partial<Attribute>) =>
  axiosInstance
    .post(`/attribute`, attribute)
    .then((e) => e.data);

const api = {
  login,
  getOrganizations,
  getAttributes,
  getUserProfile,
  registerUser,
  createAttribute
};

export default api;
