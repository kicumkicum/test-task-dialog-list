import axios from 'axios';

import stubTransportRequest from './stub-transport-request';
import { api } from '../env';

const transport = axios.create({
  baseURL: api,
  headers: {
    Accept: 'application/json',
  },
  timeout: 1000 * 20,
});

transport.request = (...args) => {
  return stubTransportRequest(...args);
};

export default transport;
