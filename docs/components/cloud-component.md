---
order: 24
title: CloudComponent 云组件
toc: menu
nav:
  title: 云组件
  order: 3
---

<Alert>
  基于 code-editor 扩展，支持组件远程或本地存储和渲染
</Alert>

```tsx
import React from 'react';
import { CloudComponent } from 'react-core-form';
import './index.less';

export default () => {
  return (
    <CloudComponent
      onAdd={async (code) => {
        console.log(code);
        await new Promise((res) => setTimeout(res, 1000));
        return Math.random();
      }}
      onSave={async (codes, code) => {
        console.log(codes, code);
      }}
    />
  );
};
```

## API

<API src="../../src/cloud-component/index.tsx" hideTitle></API>
