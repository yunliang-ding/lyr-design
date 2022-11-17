---
order: 6.1
title: EditableTable 可编辑表格
toc: menu
---

<Alert>

- 可排序、编辑表格、基于 Table 扩展、可作为自定义表单组件配合 Form 使用

</Alert>

## 基本使用

```tsx
/**
 * desc: 排序采用的react-sortable-hoc，需要提供rowKey来确定数据的唯一值，否则不能正常工作
 */
import React from 'react';
import { EditableTable, Switch } from 'react-core-form';
import schema from './schema/editable-table/schema';

export default () => {
  const [position, setPosition] = React.useState('bottom');
  const [sortable, setSortable] = React.useState(false);
  return (
    <>
      <Switch
        checkedChildren="bottom"
        unCheckedChildren="top"
        checked={position === 'bottom'}
        onChange={(v) => {
          setPosition(v ? 'bottom' : 'top');
        }}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="sort"
        unCheckedChildren="unSort"
        onChange={setSortable}
        checked={sortable}
      />
      <br />
      <br />
      <EditableTable
        rowKey="name" // 唯一标识默认是id
        value={[
          {
            name: '张三',
            sex: 0,
            sexLabel: '男',
            phone: '12234344545',
            age: 13,
          },
          {
            name: '李四',
            sex: 1,
            sexLabel: '女',
            phone: '934893489',
          },
        ]}
        position={position}
        sortable={sortable}
        {...schema}
        defaultAddValue={{
          name: '默认',
          sex: 0,
          age: 18,
        }}
      />
    </>
  );
};
```

## 配合 Form 表单使用

```tsx
import React from 'react';
import { CardForm, Button } from 'react-core-form';
import schema from './schema/editable-table/schema';

export default () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <>
      <Button
        style={{ marginBottom: 12 }}
        onClick={setReadOnly.bind(null, !readOnly)}
      >
        {!readOnly ? '设置' : '取消'}只读模式
      </Button>
      <CardForm
        title="新增客户"
        readOnly={readOnly}
        initialValues={{
          userName: 'test-001',
          relationList: [
            {
              name: '张三',
              phone: '13723785623',
              sex: 0,
              sexLabel: '男',
              age: 12,
            },
          ],
        }}
        onSubmit={onSubmit}
        schema={[
          {
            type: 'Input',
            label: '客户姓名',
            name: 'userName',
            required: true,
          },
          {
            type: 'EditableTable',
            label: '客户联系人名单',
            name: 'relationList',
            required: true,
            props: schema,
          },
        ]}
      />
    </>
  );
};
```

## Api

<API src="../../src/table-editable/index.tsx" hideTitle></API>
