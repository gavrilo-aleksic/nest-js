import axios from 'axios';
import { Attribute } from './attributes.service';
import { Organization } from './organization.service';

const API_BASE_URL = 'http://localhost:3000';

const getToken = () => localStorage.getItem('jwt');

const getHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

// Map Authorization Header
axiosInstance.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...(getHeaders() || {}) };
  return config;
});

const handledErrorCodes = [400, 404];

// Redirect to Login page if session expires
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      localStorage.removeItem('jwt');
      window.location.href = 'http://localhost:3001/login';
    }
    if (handledErrorCodes.includes(error.response.status)) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

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
  rememberMe?: boolean,
): Promise<{ accessToken: string }> =>
  axiosInstance
    .post(`/auth/login`, { username, password, rememberMe })
    .then((e) => e.data);

const getUserProfile = () =>
  axiosInstance.get(`/auth/profile`).then((e) => e.data);

const getOrganizations = () =>
  axiosInstance.get(`/organization`).then((e) => e.data);

const createOrganization = (organization: Partial<Organization>) =>
  axiosInstance.post(`/organization`, organization).then((e) => e.data);

const updateProfileOrganization = (organizationId: number) =>
  axiosInstance
    .put(`/auth`, { selectedOrganizationId: organizationId })
    .then((e) => e.data);

const updateOrganization = (organization: Partial<Organization>) =>
  axiosInstance
    .put(`/organization/${organization.id}`, organization)
    .then((e) => e.data);

const deleteOrganization = (organizationId: number) =>
  axiosInstance.delete(`/organization/${organizationId}`).then((e) => e.data);

const getAttributes = () => axiosInstance.get(`/attribute`).then((e) => e.data);

const createAttribute = (attribute: Partial<Attribute>) =>
  axiosInstance.post(`/attribute`, attribute).then((e) => e.data);

const api = {
  login,
  getOrganizations,
  getAttributes,
  getUserProfile,
  registerUser,
  createAttribute,
  createOrganization,
  updateOrganization,
  updateProfileOrganization,
  deleteOrganization,
};

export default api;
