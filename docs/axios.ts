import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api-online.yunliang.cloud',
});

export default instance;
