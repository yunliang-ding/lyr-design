---
order: 14
title: DragForm 拖拽表单
toc: menu
---

<Alert>

- 基于 `DragWrapper` 扩展的拖拽表单，可基于此设计表单设计器

</Alert>

## 基本使用

<!--
```tsx
import React from 'react';
import { uuid } from 'lyr-extra';
import { DragForm } from 'lyr-design';
import schema from './schema/form-base/schema1';

export default () => {
   // 需要一个唯一key
  const items = schema.map((i) => ({
    ...i,
    key: uuid(8),
  }));
  return (
    <DragForm
      title="基础表单"
      column={2}
      defaultSelectedKey={items[1].key}
      onItemDrop={(newSchema) => {
        console.log('onItemDrop', newSchema);
      }}
      onItemSelected={(itemKey) => {
        console.log('onItemSelected', itemKey);
      }}
      items={items}
    />
  );
};
``` -->

## 嵌套布局

```tsx
import React from 'react';
import { uuid } from 'lyr-extra';
import { DragForm } from 'lyr-design';
import schema from './schema/form-base/schema2';

const loopSetKey = (children) => {
  children.forEach((item) => {
    item.key = uuid(8);
    if (item.props?.children) {
      loopSetKey(item.props?.children);
    }
  });
};

// 需要一个唯一key
const items = schema.map((item) => {
  if (item.props?.children) {
    loopSetKey(item.props?.children);
  }
  return {
    ...item,
    key: uuid(8),
  };
});

export default () => {
  return (
    <DragForm
      title="嵌套表单"
      column={2}
      defaultSelectedKey={items[1].key}
      onItemDrop={(newSchema) => {
        console.log('onItemDrop', newSchema);
      }}
      onItemSelected={(itemKey) => {
        console.log('onItemSelected', itemKey);
      }}
      items={items}
    />
  );
};
```

## Api

<!-- <API src="../../src/drag-list/index.tsx" hideTitle></API> -->
