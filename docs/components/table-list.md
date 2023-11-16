---
order: 6.1
title: TableList 编辑表格
toc: menu
---

<Alert>

- TableList 一般适用 4~5 个字段编辑

</Alert>

## 基本使用

```tsx
import React from 'react';
import { TableList } from 'react-core-form';
import schema from './schema/table-list/schema';
import { Switch } from '@arco-design/web-react';

export default () => {
  const [showNo, setShowNo] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [removeConfirm, setRemoveConfirm] = React.useState(false);
  const [leastOne, setLeastOne] = React.useState(false);
  const [value, onChange] = React.useState([
    {
      name: '001',
    },
  ]);

  return (
    <>
      <Switch
        checkedText="展示序号"
        uncheckedText="展示序号"
        onChange={setShowNo}
      />
      &nbsp; &nbsp;
      <Switch checkedText="只读" uncheckedText="只读" onChange={setReadOnly} />
      &nbsp; &nbsp;
      <Switch
        checkedText="至少一条"
        uncheckedText="至少一条"
        onChange={setLeastOne}
      />
      &nbsp; &nbsp;
      <Switch
        checkedText="删除提醒"
        uncheckedText="删除提醒"
        onChange={setRemoveConfirm}
      />
      <br />
      <br />
      <TableList
        {...schema}
        leastOne={leastOne}
        showNo={showNo}
        readOnly={readOnly}
        removeConfirm={removeConfirm}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
```

## 配合 Form 表单使用

```tsx
import React from 'react';
import { CardForm } from 'react-core-form';
import schema from './schema/table-list/schema';

export default () => {
  const onSubmit = async (values) => {
    console.log('values: ', values);
  };
  return (
    <CardForm
      title="新增联系人"
      onValuesChange={(v, vs) => {
        console.log(vs);
      }}
      initialValues={{
        userName: 'test-001',
        relationList: [
          {
            name: '001',
          },
        ],
      }}
      schema={[
        {
          type: 'Input',
          label: '用户姓名',
          name: 'userName',
          required: true,
        },
        {
          type: 'TableList',
          label: '用户联系人',
          name: 'relationList',
          required: true,
          props: schema,
        },
      ]}
      onSubmit={onSubmit}
    />
  );
};
```

## Api

<API src="../../src/table-list/index.tsx" hideTitle></API>
