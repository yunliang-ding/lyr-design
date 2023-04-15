import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'react-core-form',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  metas: [
    {
      name: 'revised',
      content: '0.0.22',
    },
    {
      name: 'keywords',
      content: 'form-designer, react-core-form',
    },
    {
      name: 'description',
      content: '低代码相关组件',
    },
  ],
  theme: {
    '@primary-background-color': '#f0f6ff',
    '@text-color': '#6a6a6a',
    '@font-size-base': '12px',
    '@font-size-small': '12px',
    '@primary-color': '#2f54eb',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
  ],
  history: { type: 'hash' },
  links: [
    {
      href: 'https://yun-static.cdn.bcebos.com/file-icon.css',
      rel: 'stylesheet',
    },
  ],
  scripts: [
    'https://g.alicdn.com/code/lib/less.js/4.1.3/less.js',
    'https://g.alicdn.com/code/lib/ali-oss/6.13.0/aliyun-oss-sdk.min.js',
    'https://g.alicdn.com/code/lib/babel-standalone/7.21.2/babel.min.js',
    'https://g.alicdn.com/code/lib/prettier/2.0.3/standalone.min.js',
    'https://g.alicdn.com/code/lib/prettier/2.0.3/parser-typescript.min.js',
    'https://react-core-form.oss-cn-beijing.aliyuncs.com/prism.min.js',
  ],
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '工具集',
      path: 'http://121.4.49.147:9000/react-core-form-tools',
    },
    {
      title: 'Playground',
      path: 'http://121.4.49.147:9000/code-playground',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/yunliang-ding/react-core-form',
    },
  ],
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: true,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName: [],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: true,
    },
  },
  chainWebpack(config, { webpack }) {},
  // more config: https://d.umijs.org/config
});
