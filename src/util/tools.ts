/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import BigNumber from 'bignumber.js';
import { message } from 'antd';

const calculate = (
  args: BigNumber.Value[],
  type: 'plus' | 'minus' | 'multipliedBy' | 'dividedBy',
) => {
  return Number(
    args
      .reduce((a, b) => {
        return new BigNumber(a)[type](new BigNumber(b));
      })
      .toString(),
  );
};

export default {
  /** 浮点数运算 */
  BigNumber: {
    /** 加 */
    add: (...args: BigNumber.Value[]) => calculate(args, 'plus'),
    /** 减 */
    minus: (...args: BigNumber.Value[]) => calculate(args, 'minus'),
    /** 乘 */
    multiplie: (...args: BigNumber.Value[]) => calculate(args, 'multipliedBy'),
    /** 除 */
    divided: (...args: BigNumber.Value[]) => calculate(args, 'dividedBy'),
  },
  /** 判断空 */
  isEmpty: (param: any) => {
    if (param === null || param === undefined) {
      return true;
    }
    if (Array.isArray(param)) {
      return param.length === 0;
    }
    if (typeof param === 'string') {
      return param.trim() === '';
    }
    if (typeof param === 'object') {
      return Object.keys(param).length === 0;
    }
    return false;
  },
  /** 千分位，小数点2位 */
  NumberFormat: (
    number: any,
    options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ) => {
    if (isNaN(Number.parseFloat(number))) {
      return '-';
    }
    return Number(number).toLocaleString('zh-CH', options);
  },
  /** 解析url参数 */
  getUrlSearchParams: (search = '') => {
    search = search?.split('?')[1];
    const params = {};
    const searchParams: any = new URLSearchParams(search);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },
  /** 文件下载 */
  downloadFile: (url: string, fileName: string) => {
    return new Promise((res) => {
      const x = new XMLHttpRequest();
      x.open('GET', url, true);
      x.responseType = 'blob';
      x.onload = () => {
        const loadurl = window.URL.createObjectURL(x.response);
        const a = document.createElement('a');
        a.href = loadurl;
        a.download = fileName;
        a.click();
        res(true);
      };
      x.send();
    });
  },
  /** 拷贝到剪切板 */
  copyToClipBoard: async (text) => {
    /** navigator clipboard 需要https等安全上下文 */
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      message.success('已复制到剪切板');
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;

      textArea.style.position = 'absolute';
      textArea.style.opacity = '0';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const res = await new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve(true) : reject();
        textArea.remove();
      });
      if (res) {
        message.success('已复制到剪切板');
      }
    }
  },
};
