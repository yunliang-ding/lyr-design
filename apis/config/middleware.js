const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev,
    },
  },
  {
    handle: 'resource',
    enable: true,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(build|dev|favicon\.ico)/,
      gzip: true,
    },
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
    },
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb',
    },
  },
  {
    handle: 'router',
    options: {},
  },
  'logic',
  'controller',
];
