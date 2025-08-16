import axios from 'axios';
import auth from './auth';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:3000', // Android emulator localhost mapping; adjust for desktop
  timeout: 10000,
});

instance.interceptors.request.use(async config => {
  const keys = await auth.getKeys();
  if (keys && keys.apiKey) {
    config.headers['X-API-KEY'] = keys.apiKey;
  }
  return config;
});

export default instance;
