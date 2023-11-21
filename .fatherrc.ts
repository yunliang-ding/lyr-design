// 配置参考 https://github.com/umijs/father/tree/father-build@1.18.2
export default {
  esm: {
    type: 'rollup',
    minify: true,
  },
  cjs: {
    type: 'rollup',
    minify: true,
  },
  // umd: {
  //   name: 'react-core-form',
  //   minFile: true,
  // },
  // external: ['react', 'react-dom', '@arco-design/web-react'],
  extractCSS: true,
};
