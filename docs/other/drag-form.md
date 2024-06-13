> 基于 `DragWrapper` 扩展的拖拽表单，可基于此设计表单设计器

## 单层布局

```tsx | react
import { DragForm } from 'lyr-component';
import items from '@/components/schema/drag-form/schema.ts';

export default () => {
  const [schema, setSchema] = React.useState(items);
  const [selectedKey, setSelectedKey] = React.useState();
  return (
    <DragForm
      title="单层布局"
      column={2}
      items={schema}
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('onChange', newSchema);
      }}
      selectedKey={selectedKey}
      onSelected={(itemKey) => {
        setSelectedKey(itemKey);
        console.log('onSelected', itemKey);
      }}
    />
  );
};
```

## 嵌套布局

```tsx | react
import { DragForm } from 'lyr-component';
import items from '@/components/schema/drag-form/schema1.ts';

export default () => {
  const [schema, setSchema] = React.useState(items);
  const [selectedKey, setSelectedKey] = React.useState();
  return (
    <DragForm
      title="嵌套布局"
      column={2}
      items={schema}
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('onChange', newSchema);
      }}
      selectedKey={selectedKey}
      onSelected={(itemKey) => {
        setSelectedKey(itemKey);
        console.log('onSelected', itemKey);
      }}
    />
  );
};
```

## 子表单容器

```tsx | react
import { DragForm } from 'lyr-component';
import items from '@/components/schema/drag-form/schema2.ts';

export default () => {
  const [schema, setSchema] = React.useState(items);
  const [selectedKey, setSelectedKey] = React.useState();
  return (
    <DragForm
      title="子表单容器"
      column={3}
      items={schema}
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('onChange', newSchema);
      }}
      selectedKey={selectedKey}
      onSelected={(itemKey) => {
        setSelectedKey(itemKey);
        console.log('onSelected', itemKey);
      }}
    />
  );
};
```

## 添加表单元素

```tsx | react
import { Button, DragWrapper, DragForm } from 'lyr-component';

export default () => {
  const [schema, setSchema] = React.useState();
  const [selectedKey, setSelectedKey] = React.useState();
  return (
    <div>
      <DragWrapper
        style={{
          gap: 20,
        }}
        onChange={(item) => {
          console.log(item);
        }}
        accept={false}
        items={[
          {
            widget: 'Input',
            name: 'input',
            label: '输入框',
          },
          {
            widget: 'Select',
            name: 'select',
            label: '下拉选',
          },
          {
            widget: 'FormList',
            name: 'formList',
            label: '子表单容器',
            span: 2,
            props: {
              label: '输入项',
              children: [],
            },
          },
          {
            widget: 'TableList',
            name: 'tableList',
            span: 2,
            label: '编辑表格容器',
            props: {
              children: [],
              showNo: false,
              copy: false,
            },
          },
          {
            widget: 'FieldSet',
            name: 'feldSet',
            span: 2,
            label: '空容器',
            props: {
              children: [],
            },
          },
        ].map((schema) => {
          return {
            key: schema.widget,
            schema: {
              ...schema,
              name: `${schema.name}-${Math.random()}`,
            },
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
        selectedKey={selectedKey}
        onSelected={(itemKey) => {
          setSelectedKey(itemKey);
          console.log('onSelected', itemKey);
        }}
      />
    </div>
  );
};
```
## API

```API
/src/drag-form/type.tsx
```