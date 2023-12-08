// 配置参考 https://github.com/umijs/father/tree/father-build@1.18.2
export default process.env.type === 'umd'
  ? {
      umd: {
        name: 'ReactCoreForm',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@arco-design/web-react': 'arco',
          '@arco-design/web-react/icon': 'arcoicon',
        },
      },
      extractCSS: true,
    }
  : {
      esm: {
        type: 'rollup',
        minify: true,
      },
      cjs: {
        type: 'rollup',
        minify: true,
      },
      extractCSS: true,
    };
