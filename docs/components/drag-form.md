---
order: 28
title: DragForm 拖拽表单
toc: menu
---

<Alert>

- 基于 `DragWrapper` 扩展的拖拽表单，可基于此设计表单设计器

</Alert>

## 单层布局

```tsx
import React from 'react';
import { DragForm } from 'lyr-design';
import items from './schema/drag-form/schema';

export default () => {
  const [schema, setSchema] = React.useState(items);
  return (
    <DragForm
      title="单层布局"
      column={2}
      defaultSelectedKey="0001"
      items={schema}
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('onChange', newSchema);
      }}
      onSelected={(itemKey) => {
        console.log('onSelected', itemKey);
      }}
    />
  );
};
```

## 嵌套布局

```tsx
import React from 'react';
import { DragForm } from 'lyr-design';
import items from './schema/drag-form/schema1';

export default () => {
  const [schema, setSchema] = React.useState(items);
  return (
    <DragForm
      title="嵌套布局"
      column={2}
      defaultSelectedKey="0001"
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('onChange', newSchema);
      }}
      onSelected={(itemKey) => {
        console.log('onSelected', itemKey);
      }}
      items={schema}
    />
  );
};
```

## 子表单容器

```tsx
import React from 'react';
import { DragForm } from 'lyr-design';
import items from './schema/drag-form/schema2';

export default () => {
  const [schema, setSchema] = React.useState(items);
  return (
    <DragForm
      title="子表单容器"
      column={3}
      defaultSelectedKey="0001"
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('onChange', newSchema);
      }}
      onSelected={(itemKey) => {
        console.log('onSelected', itemKey);
      }}
      items={schema}
    />
  );
};
```

## 添加表单元素

```tsx
import React from 'react';
import { Button, DragWrapper, DragForm } from 'lyr-design';

export default () => {
  const [schema, setSchema] = React.useState();
  return (
    <>
      <DragWrapper
        style={{
          gap: 20,
        }}
        onChange={(item) => {
          console.log(item);
        }}
        accept={false} // 静态容器
        items={[
          {
            type: 'Input',
            name: 'input',
            label: '输入框',
          },
          {
            type: 'Select',
            name: 'select',
            label: '下拉选',
          },
          {
            type: 'FieldSet',
            name: 'feldSet',
            label: '空容器',
            props: {
              children: [],
            },
          },
        ].map((schema) => {
          return {
            key: schema.type,
            schema: schema,
            content: <Button style={{ margin: 10 }}>{schema.label}</Button>,
          };
        })}
      />
      <DragForm
        title="添加表单元素"
        column={2}
        items={schema}
        onChange={(newSchema) => {
          setSchema(newSchema);
          console.log('onChange', newSchema);
        }}
        onSelected={(itemKey) => {
          console.log('onSelected', itemKey);
        }}
      />
    </>
  );
};
```

## Api

<!-- <API src="../../src/drag-form/index.tsx" hideTitle></API> -->
