---
order: 24
title: CloudComponent 云组件
toc: menu
---

<Alert>

- 云组件相关概念设计

</Alert>

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CloudComponent } from 'react-core-form';

export default () => {
  return (
    <CloudComponent
      onSave={(code, component) => {
        console.log(code, component);
      }}
    />
  );
};
```
