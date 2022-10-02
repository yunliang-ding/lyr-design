import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8360/server/online',
});

export default instance;
