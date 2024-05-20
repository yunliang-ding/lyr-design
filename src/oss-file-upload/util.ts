export const decode = (str: string): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default (
  options = {
    bucket: 'lyr-cli-oss',
    region: 'oss-cn-beijing',
  },
) => {
  return new (window as any).OSS({
    ...options,
    accessKeyId: decode('TFRBSTV0N1RZaU1QTGo1VlVQVVlETDEy'),
    accessKeySecret: decode('Nll5ck1BdG9xUktidHRHdkFPSk1GNkRadHROV2M3'),
  });
};
