---
order: 4.2
title: CreateSpin 弹出加载
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { CreateSpin } from 'react-core-form';
import { Button } from 'antd';

export default (props) => {
  const { open, close } = CreateSpin({
    getContainer: () => {
      return document.querySelector('#create-spin-wapper1');
    },
  });
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          open();
        }}
      >
        点击加载
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        type="primary"
        onClick={() => {
          close();
        }}
      >
        关闭加载
      </Button>
      <br />
      <br />
      <div
        id="create-spin-wapper1"
        style={{
          width: 300,
          height: 100,
          display: 'flex',
          position: 'relative',
          background: '#f2f2f2',
        }}
      >
        在容器中打开
      </div>
    </>
  );
};
```

## vs-code 加载模式

```tsx
import React from 'react';
import { CreateSpin } from 'react-core-form';
import { Button } from 'antd';

export default (props) => {
  const { open, close } = CreateSpin({
    mode: 'vscode',
    getContainer: () => {
      return document.querySelector('#create-spin-wapper2');
    },
  });
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          open();
        }}
      >
        点击加载
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        type="primary"
        onClick={() => {
          close();
        }}
      >
        关闭加载
      </Button>
      <br />
      <br />
      <div
        id="create-spin-wapper2"
        style={{
          width: 300,
          height: 100,
          display: 'flex',
          position: 'relative',
          background: '#1e1e1e',
        }}
      />
    </>
  );
};
```
