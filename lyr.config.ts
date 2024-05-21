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
  docsRequire: {
    ArcoDesign: '@arco-design/web-react',
    ArcoIcon: '@arco-design/web-react/icon',
    ArcoColor: '@arco-design/color',
    lyrHooks: 'lyr-hooks',
  },
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
          label: 'Form 基本用法',
          path: '/components/form-base',
        },
        {
          label: 'Form 高级用法',
          path: '/components/form-advance',
        },
        {
          label: 'CardForm 卡片表单',
          path: '/components/card-form',
        },
        {
          label: 'AnchorCardForm 瞄点',
          path: '/components/anchor-card-form',
        },
        {
          label: 'CreateDrawer 抽屉表单',
          path: '/components/create-drawer',
        },
        {
          label: 'StepForm 分布表单',
          path: '/components/step-form',
        },
        {
          label: 'Search 查询表单',
          path: '/components/search',
        },
        {
          label: 'Table 数据表格',
          path: '/components/table',
        },
        {
          label: 'TableList 编辑表格',
          path: '/components/table-list',
        },
        {
          label: 'AnchorCard 喵点卡片',
          path: '/components/anchor-card',
        },
        {
          label: 'OssFileUpload 上传',
          path: '/components/oss-file-upload',
        },
        {
          label: 'Suspend 悬浮容器',
          path: '/components/suspend',
        },
        {
          label: 'AppLayout 应用布局',
          path: '/components/app-layout',
        },
        {
          label: 'DragWrapper 拖拽',
          path: '/components/drag-wrapper',
        },
        {
          label: 'DragList 拖拽序列',
          path: '/components/drag-list',
        },
        {
          label: 'DragForm 拖拽表单',
          path: '/components/drag-form',
        },
      ],
    },
  ],
});
