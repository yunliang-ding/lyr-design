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
import { SuspendBar, Button } from 'react-core-form';

export default () => {
  return (
    <SuspendBar
      title="便捷操作栏"
      // placement="left"
      show
      top="50%"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button type="primary">操作1</Button>
        <Button type="primary">操作2</Button>
        <Button type="primary">操作3</Button>
      </div>
    </SuspendBar>
  );
};
```

## Api

<API src="../../src/suspend-bar/index.tsx" hideTitle></API>
