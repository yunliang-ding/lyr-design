---
order: 2
title: 介绍
toc: menu
nav:
  title: 状态管理
  order: 2
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">react-core-form-store</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/react-core-form-store">
    <img alt="npm" src="http://center.yunliang.cloud/npm/version?package=react-core-form-store">
  </a>
  <a href="https://npmmirror.com/package/react-core-form-store">
    <img alt="NPM downloads" src="http://center.yunliang.cloud/npm/downloads?package=react-core-form-store">
  </a>
</p>

<Alert>

- 解决组件之间多层级属性传递问题、 支持 友好的 Ts 类型定义

- 使用 Proxy 拦截了属性的修改，基于 use-sync-external-store 做了简单的封装

- 由于底层基于 Proxy 的特性，在一定程度上可以不被 hooks 规则约束（即支持在任务场景中修改状态）

</Alert>

## 安装

```shell
npm install react-core-form-store --save
```

## 基本用法

```tsx
import React from 'react';
import store from './store';
import { useStore } from 'react-core-form-store';

export default () => {
  const { count, addCount } = useStore(store);
  console.log('render...');
  return (
    <div>
      {count}
      <br />
      <button
        onClick={async () => {
          store.count += 1;
          // await addCount()
        }}
      >
        添加
      </button>
    </div>
  );
};
```
