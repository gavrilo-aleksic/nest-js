import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const login = (
  username: string,
  password: string,
): Promise<{ accessToken: string }> =>
  axios
    .post(`${API_BASE_URL}/auth/login`, { username, password })
    .then((e) => e.data);
