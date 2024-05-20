const { readFileSync: rfs } = require('fs');

module.exports = class extends think.Controller {
  indexAction() {
    const mode = think.env === 'production' ? 'build' : 'dev';
    const body = rfs(`${think.ROOT_PATH}/www/${mode}/index.html`).toString();
    this.ctx.res.end(body);
  }
};
