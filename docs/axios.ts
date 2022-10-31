import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://121.4.49.147:8361',
});

export default instance;
