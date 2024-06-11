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
    "https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/eval5.min.js",
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prism.min.js',
    "https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-code-editor.min.js",
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-extra.min.js',
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
    "https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/eval5.min.js",
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prism.min.js',
    "https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-code-editor.min.js",
    'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-extra.min.js',
  ],
  serverPath: '/apis',
  docsRequire: {
    ArcoDesign: '@arco-design/web-react',
    ArcoIcon: '@arco-design/web-react/icon',
    ArcoColor: '@arco-design/color',
    lyrHooks: 'lyr-hooks',
  },
  navs: [
    {
      title: 'lyr-extra',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-extra',
    },
    {
      title: 'lyr-hooks',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-hooks',
    },
    {
      title: 'lyr-low-code',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-low-code',
    },
    {
      title: 'lyr-code-editor',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-code-editor',
    },
    {
      title: 'lyr-cli',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-cli',
    },
    {
      title: 'lyr-docs',
      path: 'https://dev-ops.yunliang.cloud/website/lyr-docs',
    },
  ],
  menus: [
    {
      label: '介绍',
      path: '/',
    },
    {
      label: '表单相关',
      path: '/components',
      children: [
        {
          label: 'Form 基本用法',
          path: '/components/form-base',
        },
        {
          label: 'Form 高级用法',
          path: '/components/form-advance',
        },
        {
          label: 'CardForm 卡片',
          path: '/components/card-form',
        },
        {
          label: 'CreateModal 弹出层',
          path: '/components/create-modal',
        },
        {
          label: 'CreateDrawer 抽屉',
          path: '/components/create-drawer',
        },
        {
          label: 'StepForm 分布操作',
          path: '/components/step-form',
        },
        {
          label: 'AnchorCardForm 锚点',
          path: '/components/anchor-card-form',
        },
        {
          label: 'Search 查询',
          path: '/components/search',
        },
      ],
    },
    {
      label: '数据展示',
      path: '/display',
      children: [
        {
          label: 'Table 数据表格',
          path: '/display/table',
        },
        {
          label: 'AnchorCard 锚点卡片',
          path: '/display/anchor-card',
        },
        {
          label: 'AppLayout 应用布局',
          path: '/display/app-layout',
        },
      ],
    },
    {
      label: '其他',
      path: '/other',
      children: [
        {
          label: 'Button 扩展',
          path: '/other/button',
        },
        {
          label: 'Suspend 悬浮容器',
          path: '/other/suspend',
        },
        {
          label: 'TableList 编辑表格',
          path: '/other/table-list',
        },
        {
          label: 'OssFileUpload 上传',
          path: '/other/oss-file-upload',
        },
        {
          label: 'DragWrapper 拖拽',
          path: '/other/drag-wrapper',
        },
        {
          label: 'DragList 拖拽序列',
          path: '/other/drag-list',
        },
        {
          label: 'DragForm 拖拽表单',
          path: '/other/drag-form',
        },
      ],
    },
    {
      label: '更新日志',
      path: '/logs',
    },
  ],
});
