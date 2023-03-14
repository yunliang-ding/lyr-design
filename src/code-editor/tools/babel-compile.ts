/* eslint-disable */
const antd = require('antd');
const react = require('react');
const axios = require('axios');
const moment = require('moment');

const safeEval = (code: string) => {
  try {
    return Function(code)();
  } catch (error) {
    console.log('safeEval error info', error);
  }
};

class BabelCompile {
  scope: any = {};
  exports = {};
  constructor(scope = {}) {
    this.scope = {
      react,
      moment,
      axios,
      antd,
      ...scope,
    };
  }
  require = (key: string) => {
    if (this.scope[key] === undefined) throw new Error(`${key} is not define`);
    return this.scope[key];
  };
  excuteCode = (code: string): any => {
    const { transform } = (window as any).Babel;
    const res: any = {
      isError: false,
      error: '',
      exports: {},
    };
    try {
      const es5 = transform(code, {
        presets: ['env', 'react'],
      }).code;
      const transfromCode = transform(
        `(require, exports) => {
          ${es5};
        }`,
        {
          presets: ['env', 'react'],
        },
      ).code;
      // 在解析的es5中 注入 return 用 safeEval 执行
      const parseCode = transfromCode
        .replace('"use strict";\n\n(', '"use strict";\n\n return (')
        .replace("'use strict';\n\n(", "'use strict';\n\n return (");
      safeEval(parseCode).call(null, this.require, this.exports);
      res.exports = this.exports;
    } catch (error) {
      console.log('catch transform error:', error);
      throw error;
    }
    return res;
  };
  getES5Code = (code: string): any => {
    const { transform } = (window as any).Babel;
    try {
      const es5 = transform(code, {
        presets: ['env', 'react'],
      }).code;
      const transfromCode = transform(
        `(require) => {
          ${es5};
        }`,
        {
          presets: ['env', 'react'],
        },
      ).code;
      // 在解析的es5中 注入 return 用 safeEval 执行
      const parseCode = transfromCode
        .replace('"use strict";\n\n(', '"use strict";\n\n return (')
        .replace("'use strict';\n\n(", "'use strict';\n\n return (");
      return parseCode;
    } catch (error) {
      console.log('catch transform error:', error);
      throw error;
    }
  };
}
export default BabelCompile;
