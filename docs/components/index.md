---
order: 1
title: 介绍
toc: menu
nav:
  title: 组件
  order: 1
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">react-core-form</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/react-core-form">
    <img alt="npm" src="http://dev-ops.yunliang.cloud:7201/npm/version?package=react-core-form">
  </a>
  <a href="https://npmmirror.com/package/react-core-form">
    <img alt="NPM downloads" src="http://dev-ops.yunliang.cloud:7201/npm/downloads?package=react-core-form">
  </a>
</p>

## 设计初衷

<Alert>

- 将视图层 Jsx 中所依赖的配置抽离成独立 schema 模块，避免后期不同人开发导致单个页面庞大不好维护

- 采用统一的开发模式，提高项目代码的统一性、可读性、在一定程度上即使你不会 React 也可以完成基础的 CRUD 的页面（后端同学）且代码风格一致

- 统一管理表单项，我们希望所有的表单被统一管理，我们能有入口可以拦截到，去做一些事情。

</Alert>

## 安装

> 组件库本身依赖 ant design，使用需要同时安装 antd，在 src/global.less 中全量引入 antd less 文件

```shell
npm install react-core-form --save
```

```less
@import '~antd/dist/antd.less';
```

## 为什么不是 XRender、Formily

<Alert>

- [XRender](https://x-render.gitee.io/form-render) 以及 [Formily](https://v2.formilyjs.org/zh-CN/guide) 都是比较成熟的表单解决方案但是他们在 Schema 规范、以及上手需要一定的学习成本

- 底层我们不能完全掌控，我们不能更好的从业务需求的角度去做扩展、加功能，Api 都是被第三方约束了

- 我们定义的数据模型更加的直观，只要掌握 antd4 表单使用可立即上手，底层也是我们自己掌控

- 最重要的一点，我们会结合自身的业务场景去做扩展，会内置更多符合业务的通用组件

</Alert>

## 优势

<Alert type="success">

- Form 我们基于 Antd4 的表单进行扩展、增强，编写好配置即可完成复杂的渲染和交互逻辑

- 我们扩展多种异步选择器的 `widgets`，可以满足大部分的查询场景用少量代码即可实现[ 点击查看](/components/form-advance#使用异步的-options)

- 我们内置的组件，支持详情和编辑 2 种渲染模式可一键切换[ 点击查看](/components/form-base#使用-disabledreadonly)

- 通过支持自定义渲染、自定义组件的模式，可以 100%覆盖业务场景[ 点击查看](/components/form-advance#使用自定义渲染)

</Alert>

## 内置表单组件

```tsx
/**
 * title: 所有组件 扩展了 readOnly, disabled 属性
 */
import * as React from 'react';
import { Grid } from 'react-core-form';
import { Button } from 'antd';
export default () => {
  return (
    <Grid>
      {[
        'Input(antd)',
        'AutoComplete(antd)',
        'InputNumber(antd)',
        'Rate(antd)',
        'Slider(antd)',
        'TextArea(antd)',
        'Password(antd)',
        'Select(antd)',
        'RadioGroup(antd)',
        'CheckGroup(antd)',
        'DatePicker(antd)',
        'TimePicker(antd)',
        'TimeRange(antd)',
        'RangePicker(antd)',
        'TreeSelect(antd)',
        'Cascader(antd)',
        'Upload(antd)',
        'Switch(antd)',
      ].map((item) => {
        return (
          <Button key={item} type="dashed">
            {item}
          </Button>
        );
      })}
      {[
        'Render 自定义渲染',
        'AsyncRender 自定义异步渲染',
        'AsyncSelect 支持异步',
        'AsyncCheckGroup 支持异步',
        'AsyncRadioGroup 支持异步',
        'AsyncTreeSelect 支持异步',
        'DebounceSelect 设置防抖',
        'AsyncCascader 支持异步',
        'FormList 子表单',
        'BlockQuote 平级区块',
        'FieldSet 父子级区块',
        'RangeInput 数字范围输入框',
        'OssFileUpload 文件上传',
        'CodeEditor 代码编辑器',
      ].map((item) => {
        return <Button key={item}>{item}</Button>;
      })}
    </Grid>
  );
};
```

## 配置说明

> 我们将模型转为 Jsx 的过程中会做一些默认处理，减少配置，如下

- Input 开启计数器，最大长度 `64`
- 输入框 placeholder `请输入${label}`，下拉框 placeholder `请选择${label}`
- 输入框、选择框开启 `allowClear`
- FormItem required: true 等于 rules:[{required: true, message: `${label}不能为空`}]，如果配置了 ules 且没有设置必填则会在 rules 里面插入该规则
- 下拉容器组件设置 getPopupContainer 指向到父节点
- 下拉选配置了 showSearch 可实现模糊查询的功能不需要设置 filterOption
- 对于时间日期选择器，会自动进行 moment 和 string 的转化

## 全局配置拦截

> 通常组件在接入到项目中，会再封装一层便于对组件的属性统一拦截等，组件库提供全局配置拦截方案，可以在不封装的前期下完成该操作 `全局配置具有最高的优先级`

```ts
import { setGlobalConfig } from 'react-core-form';

setGlobalConfig({
  Antd: {
    defaultInputMaxLength: 100,
  },
  Form: {
    layout: 'vertical',
  }
  Table: {
    autoNo: true,
  },
  DrawerForm: {
    drawerProps: {
      maskClosable: false,
    },
  },
});

interface GlobalConfigProps {
  Antd?: {
    /** 默认输入框最大长度 */
    defaultInputMaxLength: number;
    /** 是否开启自动填充 placeholder */
    defaultFillPlaceholder: boolean;
    /** 是否开启自动清空 */
    defaultOpenAllowClear: boolean;
    /** 是否自动为选择器挂载Popup容器 */
    autoSetPopupContainer: boolean;
    /** 是否支持自动转换日期选择器moment和string */
    autoTransfromDatePicker: boolean;
    /** 输入框失去焦点自动清除前后空格 */
    autoTrimInputSpaceOnBlur: boolean;
    /** 默认展示输入框的计数器 */
    defaultShowInputCount: boolean;
  };
  Form?: ((props) => CoreFormProps) | CoreFormProps;
  DrawerForm?: ((props) => DrawerFormProps) | DrawerFormProps;
  Table?: ((props) => TableProps) | TableProps;
}
```

## 高级用法

- [如何处理的简单联动？](/components/form-advance#使用-effect-实现联动交互)
- [如何支持定制化渲染逻辑？](/components/form-advance#使用自定义渲染)
- [如何编写自定义组件？](/components/form-advance#使用自定义组件采用-widgets-实现)
- [我的下拉选择数据源是通过接口获取的怎么在模型中配置？](/components/form-advance#使用异步的-options)
- [弹出一个提交表单，不希望通过 visible 控制怎么实现？](/components/create-modal)

## Form 属性扩展

<API src="../../src/form/index.tsx" hideTitle></API>

## FormItem 属性扩展

<API src="../../src/form/type.item.tsx" hideTitle></API>

## FormInstance 扩展

<API src="../../src/form/type.instance.tsx" hideTitle></API>
