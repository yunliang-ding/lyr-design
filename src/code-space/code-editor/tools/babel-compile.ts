import { Interpreter } from 'eval5';

/* eslint-disable */
const antd = require('antd');
const react = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class BabelCompile {
  scope: any = {};
  exports = {};
  constructor(scope = {}) {
    this.scope = {
      react,
      'react-dom': ReactDOM,
      antd,
      axios,
      ...scope,
    };
  }
  require = (key: string) => {
    if (this.scope[key] === undefined) throw new Error(`${key} is not define`);
    return this.scope[key];
  };
  excuteCode = (code: string): any => {
    const res: any = {
      isError: false,
      error: '',
      exports: {},
    };
    try {
      // 采用 eval5 的包
      const interpreter = new Interpreter(window);
      interpreter.evaluate(this.getES5Code(code))(this.require, this.exports);
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
      return transform(
        `(require, exports) => {
          ${es5};
        }`,
        {
          presets: ['env', 'react'],
        },
      ).code;
    } catch (error) {
      console.log('catch transform error:', error);
      throw error;
    }
  };
}
export default BabelCompile;
