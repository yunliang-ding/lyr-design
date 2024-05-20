import { defineConfig } from 'lyr';

export default defineConfig({
  title: 'lyr-component',
  favicon: 'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico',
  link: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.css',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.css',
  ],
  devScript: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.development.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.development.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/router.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router-dom.development.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/aliyun-oss-sdk.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js',
  ],
  buildScript: [
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/router.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-router-dom.production.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/aliyun-oss-sdk.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/track.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js',
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js',
  ],
  serverPath: '/apis',
  navs: [
    {
      title: '工具集',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-extra',
    },
    {
      title: 'Hooks',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-hooks',
    },
    {
      title: '表单设计器',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-low-code',
    },
    {
      title: '代码编辑器',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-code-editor',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/yunliang-ding/lyr-component',
    },
  ],
  menus: [
    {
      label: '介绍',
      path: '/',
    },
    {
      label: '组件',
      path: '/components',
      children: [
        {
          label: 'Button 扩展',
          path: '/components/button',
        },
        {
          label: 'BabelParse',
          path: '/components/babel-parse',
        },
        {
          label: 'ConsoleRender',
          path: '/components/console-render',
        },
        {
          label: 'copyToClipBoard',
          path: '/components/copy-to-clip-board',
        },
        {
          label: 'docxReplace',
          path: '/components/docx-replace',
        },
        {
          label: 'downloadFile',
          path: '/components/download-file',
        },
        {
          label: 'getElementSnapshot',
          path: '/components/get-element-snapshot',
        },
        {
          label: 'getUrlSearchParams',
          path: '/components/get-url-search-params',
        },
        {
          label: 'MarkdownViewer',
          path: '/components/markdown-viewer',
        }
      ],
    },
  ],
});
