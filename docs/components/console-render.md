---
order: 15
title: Console 渲染
toc: menu
---

<Alert>

- 渲染 Console.log

</Alert>

## 基本使用

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { ConsoleRender } from 'react-core-form';
export default () => {
  return (
    <ConsoleRender
      values={[
        [100, 'test', new Date(), Object, () => {}, null, undefined],
        [
          [1, 2, 3, 4],
          { name: 'test', age: 10 },
          { address: 'test', liked: [1, 2, 3] },
          [100, 200],
        ],
      ]}
    />
  );
};
```
