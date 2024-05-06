---
order: 27
title: DragList 拖拽列表
toc: menu
---

<Alert>

- 基于 `DragWrapper` 扩展的单列拖拽组件

</Alert>

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { DragList } from 'lyr-component';

export default () => {
  return (
    <DragList
      width={100}
      onChange={(list) => {
        console.log(list);
      }}
      items={[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        return {
          key: i,
          content: i,
        };
      })}
    />
  );
};
```

## Api

<API src="../../src/drag-list/index.tsx" hideTitle></API>
