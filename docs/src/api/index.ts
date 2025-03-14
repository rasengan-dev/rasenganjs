import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.smadmail.com/api/v1',
  timeout: 10000,
});
