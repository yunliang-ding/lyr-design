---
order: 14
title: DragForm 拖拽表单
toc: menu
---

<Alert>

- 基于 `DragWrapper` 扩展的拖拽表单，可基于此设计表单设计器

</Alert>

## 基本使用

```tsx
import React from 'react';
import { DragForm } from 'lyr-design';

export default () => {
  return (
    <DragForm
      title="基础的拖拽表单"
      column={2}
      defaultSelectedKey="002"
      onItemDrop={(newSchema) => {
        console.log('onItemDrop', newSchema);
      }}
      onItemClick={(itemKey) => {
        console.log('onItemClick', itemKey);
      }}
      schema={[
        {
          key: '001',
          type: 'Input',
          label: '输入框1',
          name: 'userName',
        },
        {
          key: '002',
          type: 'Select',
          label: '选择框1',
          name: 'select',
          props: {
            options: [],
          },
        },
        {
          key: '003',
          type: 'Input',
          label: '输入框2',
          name: 'userName1',
        },
        {
          key: '004',
          type: 'Select',
          label: '选择框2',
          name: 'select2',
          props: {
            options: [],
          },
        },
      ]}
    />
  );
};
```

## Api

<!-- <API src="../../src/drag-list/index.tsx" hideTitle></API> -->
