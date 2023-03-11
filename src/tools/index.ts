/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import BigNumber from 'bignumber.js';
import { message } from 'antd';
import { isEmpty, uuid } from '../util';
import html2canvas from 'html2canvas';
import { useReactToPrint as doPrintElement } from 'react-to-print';
import { babelParse } from '../code-editor/tools';
import { decrypt, encrypt } from '@/code-editor/function-editor';

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
const encode = (str): string => {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};

const decode = (str): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
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
  isEmpty,
  uuid,
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
  encode,
  decode,
  /** 获取元素快照 */
  getElementSnapshot: (element) => {
    return {
      printImg: doPrintElement({
        bodyClass: 'print-class',
        content: () => document.querySelector(element),
      }),
      // 直接下载
      downloadImg: (filename: string) =>
        new Promise((res) => {
          html2canvas(document.querySelector(element), { useCORS: true }).then(
            (canvas) => {
              document.documentElement.classList.remove('html2canvas');
              const a = document.createElement('a');
              a.download = filename;
              a.href = canvas.toDataURL();
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              res(true);
            },
          );
        }),
      getDataURL: async () =>
        new Promise((res) => {
          html2canvas(document.querySelector(element), { useCORS: true }).then(
            (canvas) => {
              res(canvas.toDataURL());
            },
          );
        }),
    };
  },
  /** 编译代码 */
  babelParse,
  encrypt,
  decrypt,
  /** 获取 oss 实例 相关 */
  createOssInstance: (
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
  },
};
