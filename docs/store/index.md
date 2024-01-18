---
order: 2
title: 介绍
toc: menu
nav:
  title: 状态管理
  order: 2
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">lyr-store</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/lyr-store">
    <img alt="npm" src="https://center.yunliang.cloud/npm/version?package=lyr-store">
  </a>
  <a href="https://npmmirror.com/package/lyr-store">
    <img alt="npm" src="https://center.yunliang.cloud/npm/downloads?package=lyr-store">
  </a>
</p>

<Alert type='success'>

- 解决组件之间多层级属性传递问题、 支持 友好的 Ts 类型定义

- 使用 Proxy 拦截了属性的修改，基于 use-sync-external-store 做了简单的封装

</Alert>

## 安装

```shell
npm install lyr-store --save
```

## 创建 store

```js | plus
import { create } from 'lyr-store';

export default create<{
  count: number;
  addCount():void;
}>({
  count: 1,
  addCount() {
    this.count++;
  },
});
```

## 使用 store

```js | plus
import store from './store';

export default () => {
  const { count, addCount } = store.use();
  return (
    <div>
      {count}
      <button
        onClick={() => {
          addCount(); // 或者直接 store.count += 1;
        }}
      >
        添加
      </button>
    </div>
  );
};
```

## 基本用法

```tsx
import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';

export default () => {
  const [show, setShow] = useState(true);
  const [remove, setRemove] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setRemove(!remove);
        }}
      >
        模拟卸载
      </Button>
      &nbsp;&nbsp;
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        模拟切换
      </Button>
      {!remove && (
        <>
          <br />
          <br />
          {show ? <Demo1 /> : <Demo2 />}
          <Demo3 />
        </>
      )}
    </div>
  );
};
```
