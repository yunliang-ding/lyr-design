import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.yunliang.cloud',
});

export default instance;
