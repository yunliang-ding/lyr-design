---
order: 24
title: CloudComponent 云组件
toc: menu
sidemenu: false
nav:
  title: 云组件
  order: 3
---

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CloudComponent } from 'react-core-form';
import './index.less';

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
