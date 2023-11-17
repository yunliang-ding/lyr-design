## 介绍

> react-core-form 目前是一套基于 arco.design 二次封装的，可快捷开发中后台项目的解决方案

## 安装

> 组件库本身依赖 arco.design，使用需要同时安装 arco.design

```shell
npm install @arco-design/web-react --save
npm install react-core-form --save
```

```less
@import '@arco-design/web-react/dist/css/arco.css';
@import 'react-core-form/dist/index.css';
```

## 基于 arco.design 的扩展点

- 扩展 `Button`，自带 loading，二次确认，支持弹框和抽屉的模型配置
- 扩展 `Form`，基于数据模型的表单渲染，表单联动，异步选择器，自定义组件，默认配置
- 扩展 `ModalForm`, `DrawerForm`, `CardForm`, `AnchorCardForm`, `SetpForm`, `SearchForm` 提交表单
- 扩展 `Table` ，基于数据模型渲染，扩展 toolBar 配置，request 配置，search 配置
- 扩展 `TableList`，`EditableTable` 针对表格编辑的场景
- 扩展 `OssFileUpload` 文件上传组件
- 新增 `CerateModal`, `CreateDrawer`，支持 api 打开抽屉或者弹框，Modal 支持可拖拽
- 新增 `AppLayout`，中后台布局统一大模版
- 新增 `MarkDownPreview`，渲染 markdown 组件
- 新增 `Suspend` 悬浮组件

## 在线文档

[点击跳转文档](http://dev-ops.yunliang.cloud/website/react-core-form)
