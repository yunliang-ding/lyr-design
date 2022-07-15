---
order: 12
title: DragList 拖拽列表
toc: menu
---

<Alert>

- 拖拽调整位置列表

</Alert>

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { DragList } from 'react-core-form';
export default () => {
  return (
    <div style={{ width: 100 }}>
      <DragList
        defaultActiveKey={3}
        onClick={(item) => {
          console.log(item);
        }}
        onChange={(list) => {
          console.log(list);
        }}
        list={[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          return {
            key: i,
            label: <div style={{ padding: 6 }}>{i}</div>,
          };
        })}
      />
    </div>
  );
};
```

## Api

<API src="../../src/drag-list/index.tsx" hideTitle></API>
