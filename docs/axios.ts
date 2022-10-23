import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://1.15.184.206:8360/server/online',
});

export default instance;
