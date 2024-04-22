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
import { TableList } from 'lyr-design';
import { useReactive } from 'lyr-hooks';
import schema from './schema/table-list/schema';
import { Switch } from '@arco-design/web-react';

export default () => {
  const store = useReactive({
    showNo: false,
    readOnly: false,
    removeConfirm: false,
    leastOne: false,
    sortable: false,
    value: [
      {
        name: '001',
      },
      {
        name: '002',
      },
    ],
  });
  return (
    <>
      <Switch
        checkedText="展示序号"
        uncheckedText="展示序号"
        onChange={() => (store.showNo = !store.showNo)}
      />
      &nbsp; &nbsp;
      <Switch
        checkedText="只读"
        uncheckedText="只读"
        onChange={() => (store.readOnly = !store.readOnly)}
      />
      &nbsp; &nbsp;
      <Switch
        checkedText="至少一条"
        uncheckedText="至少一条"
        onChange={() => (store.leastOne = !store.leastOne)}
      />
      &nbsp; &nbsp;
      <Switch
        checkedText="删除提醒"
        uncheckedText="删除提醒"
        onChange={() => (store.removeConfirm = !store.removeConfirm)}
      />
      &nbsp; &nbsp;
      <Switch
        checkedText="支持排序"
        uncheckedText="支持排序"
        onChange={() => (store.sortable = !store.sortable)}
      />
      <br />
      <br />
      <TableList
        {...schema}
        leastOne={store.leastOne}
        showNo={store.showNo}
        sortable={store.sortable}
        readOnly={store.readOnly}
        removeConfirm={store.removeConfirm}
        value={store.value}
        onChange={(v) => {
          console.log('change', v);
          store.value = v;
        }}
      />
    </>
  );
};
```

## 配合 Form 表单使用

```tsx
import React from 'react';
import { CardForm } from 'lyr-design';
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
