import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'react-core-form 2.x',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  favicon:
    'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
  logo: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
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
    '@c-primary': '#165dff',
  },
  styles: [
    `
    div,
    span,
    td,
    th,
    a,
    button,
    p,
    label {
      font-size: 12px;
      font-weight: 500;
    }
    h2{
      font-size: 18px !important;
    }
    li, input, label{
      font-weight: 500 !important;
      font-size: 12px !important;
    }
    .__dumi-default-menu-list
      > li
      > a {
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .__dumi-default-menu-list
      > a
      > span {
        font-size: 12px;
      }
  `,
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: true, // 样式按需加载
      },
    ],
  ],
  history: { type: 'hash' },
  hash: false,
  scripts: [
    'https://g.alicdn.com/code/lib/ali-oss/6.13.0/aliyun-oss-sdk.min.js',
  ],
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '工具集',
      path: 'http://dev-ops.yunliang.cloud/website/react-core-form-tools',
    },
    {
      title: '表单设计器',
      path: 'http://dev-ops.yunliang.cloud/website/react-core-form-designer',
    },
    {
      title: '代码编辑器',
      path: 'http://dev-ops.yunliang.cloud/website/react-core-form-code-editor',
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
