// default config
const isDev = think.env === 'development';

module.exports = {
  workers: 1,
  env: think.env,
  port: 8000
};
