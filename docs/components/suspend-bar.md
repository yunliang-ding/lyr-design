---
order: 22
title: SuspendBar 悬浮操作栏
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { SuspendBar } from 'react-core-form';

export default () => {
  return (
    <SuspendBar
      title="标题信息"
      placement="left"
      show
      top="30%"
      bodyStyle={{
        width: 160,
        gap: 10,
      }}
    >
      这是一个描述信息
    </SuspendBar>
  );
};
```

## 挂载到指定节点

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { SuspendBar, Button } from 'react-core-form';

export default () => {
  return (
    <SuspendBar
      title="标题信息"
      show
      top="20%"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: 120,
      }}
      getContainer={() => {
        return document.querySelector('#suspend-bar-demo');
      }}
    >
      <Button type="primary">操作1</Button>
      <Button type="primary">操作2</Button>
      <Button type="primary">操作3</Button>
    </SuspendBar>
  );
};
```

## 渲染抽屉

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { SuspendBar } from 'react-core-form';
import { Drawer } from 'antd';
export default () => {
  return (
    <SuspendBar
      title="标题信息"
      show={false}
      top="50%"
      bodyStyle={{
        width: 500,
        height: 'calc(100vh - 50px)',
        gap: 10,
      }}
    >
      这是一个类似抽屉的展开收起
    </SuspendBar>
  );
};
```

## Api

<API src="../../src/suspend-bar/index.tsx" hideTitle></API>
