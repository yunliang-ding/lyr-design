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
import { TableList, Switch } from 'react-core-form';
import schema from './schema/table-list/schema';

export default () => {
  const [showNo, setShowNo] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [removeConfirm, setRemoveConfirm] = React.useState(false);
  const [leastOne, setLeastOne] = React.useState(false);
  const [value, onChange] = React.useState([{}]);

  return (
    <>
      <Switch
        checkedChildren="展示序号"
        unCheckedChildren="展示序号"
        onChange={setShowNo}
      />
      &nbsp; &nbsp;
      <Switch
        checkedChildren="只读"
        unCheckedChildren="只读"
        onChange={setReadOnly}
      />
      &nbsp; &nbsp;
      <Switch
        checkedChildren="至少一条"
        unCheckedChildren="至少一条"
        onChange={setLeastOne}
      />
      &nbsp; &nbsp;
      <Switch
        checkedChildren="删除提醒"
        unCheckedChildren="删除提醒"
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
        defaultAddValue={() => {
          return {
            name: '默认姓名',
            sex: 0,
            age: 18,
          };
        }}
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
        relationList: [{}],
      }}
      onSubmit={onSubmit}
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
    />
  );
};
```

## Api

<API src="../../src/table-list/index.tsx" hideTitle></API>
