import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-online.yunliang.cloud',
});

export default instance;
