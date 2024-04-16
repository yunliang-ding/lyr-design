---
order: 12
title: DragWrapper 拖拽包裹组件
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { DragWrapper } from 'lyr-design';

export default () => {
  return (
    <DragWrapper
      style={{
        gap: 20,
      }}
      onChange={(item) => {
        console.log(item);
      }}
      items={[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((i) => {
        return {
          key: i,
          content: (
            <div
              style={{
                width: 100,
                height: 100,
                background: '#aaa',
                color: '#fff',
              }}
            >
              {i}
            </div>
          ),
        };
      })}
    />
  );
};
```

## Api

<!-- <API src="../../src/dnd/index.tsx" hideTitle></API> -->
