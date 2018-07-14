import axios from 'axios';
import { api } from '../env';

const transport = axios.create({
  baseURL: api,
  headers: {
    Accept: 'application/json',
  },
  timeout: 1000 * 20,
});

export default transport;
