## 介绍

> lyr-design 目前是一套基于 arco.design 二次封装的，可快捷开发中后台项目的解决方案

## 安装

> 组件库本身依赖 arco.design，使用需要先安装 arco.design

```shell
yarn add lyr-design
```

```less
@import '@arco-design/web-react/dist/css/arco.css';
@import 'lyr-design/dist/index.css';
```

## 采用 cdn 引入

```html
<link
  rel="stylesheet"
  href="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-design.min.css"
/>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-design.min.js"></script>
```

## 前提需要引入 cdn 前置依赖 到 window

```html
<!-- window.React -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js"></script>
<!-- window.ReactDOM -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js"></script>
<!-- window.arco -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js"></script>
<!-- window.arcoicon -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js"></script>
<!-- window.jsxRuntime -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js"></script>
```

## lyr-design 扩展点

- 扩展 `Button`，自带 loading，二次确认，支持弹框和抽屉的模型配置
- 扩展 `Form`，基于数据模型的表单渲染，表单联动，异步选择器，自定义组件，默认配置
- 新增 `CreateModal`， `CreateDrawer`，支持 api 打开抽屉或者弹框，Modal 支持可拖拽
- 扩展 `CardForm`， `AnchorCardForm`， `SetpForm`， `SearchForm` 等提交表单
- 扩展 `Table` ，基于数据模型渲染，扩展 toolBar 配置，request 配置，search 配置
- 扩展 `TableList` 针对表格编辑的场景
- 扩展 `DragWrapper`，`DragList`， `DragForm` 轻量级拖拽组件
- 扩展 `OssFileUpload` 文件上传组件
- 新增 `Suspend` 悬浮组件
- 新增 `AppLayout`，中后台布局统一大模版

## 在线文档

[点击跳转文档](https://dev-ops.yunliang.cloud/website/lyr-design)
