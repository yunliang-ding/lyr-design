import { decode } from 'react-core-form-tools';

export default (
  options = {
    bucket: 'react-core-form',
    region: 'oss-cn-beijing',
  },
) => {
  return new window.OSS({
    ...options,
    accessKeyId: decode('TFRBSTV0N1RZaU1QTGo1VlVQVVlETDEy'),
    accessKeySecret: decode('Nll5ck1BdG9xUktidHRHdkFPSk1GNkRadHROV2M3'),
  });
};
