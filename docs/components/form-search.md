---
order: 5
title: Search 查询表单
toc: menu
---

<Alert>

- 通过传入的 schema 自动渲染、并包含查询、重制、等功能、展开更多等

</Alert>

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 * title: 默认点击查询按钮会用0.5s的加载交互
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema';
export default () => {
  return (
    <Search
      schema={schema}
      onReset={() => {
        console.log('onReset');
      } as any }
      onSearch={(params) => {
        console.log('params ->', params);
      } as any }
    />
  );
};
```

## 使用 labelWidth 设置文本宽度使之对齐

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema1';
export default () => {
  return (
    <Search
      schema={schema}
      onReset={() => {
        console.log('onReset');
      } as any }
      onSearch={(params) => {
        console.log('params ->', params);
      } as any }
    />
  );
};
```

## 按钮顺序调换

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema';
export default () => {
  return (
    <Search
      schema={schema}
      toolReverse
      onReset={() => {
        console.log('onReset');
      } as any }
      onSearch={(params) => {
        console.log('params ->', params);
      } as any }
    />
  );
};
```

## 设置默认值

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema';
export default () => {
  return (
    <Search
      schema={schema}
      initialValues={{
        level: 1,
        sex: 1,
        date: '2022-02-12',
      } as any }
      onSearch={(params) => {
        console.log('onSearch ->', params);
      } as any }
    />
  );
};
```

## 外部调用查询

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Search, Form, Button } from 'react-core-form';
import { Space } from 'antd';
import schema from './schema/form-search/schema';
export default () => {
  const [form] = Form.useForm();
  return (
    <>
      <Space>
        <Button
          type="primary"
          spin
          onClick={async () => {
            const values = await form.submit(); // 提交
            console.log('search', values);
          } as any }
        >
          外部查询
        </Button>
        <Button
          onClick={() => {
            form.reset();
          } as any }
        >
          外部重制
        </Button>
      </Space>
      <br />
      <br />
      <Search schema={schema} form={form} />
    </>
  );
};
```

## 控制加载时间

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema';
export default () => {
  return (
    <Search
      schema={schema}
      onSearch={async (params) => {
        await new Promise((res) => setTimeout(res, 1000));
        console.log('onSearch ->', params);
      } as any }
    />
  );
};
```

## 设置立即查询

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema2';
export default () => {
  return (
    <Search
      schema={schema}
      onSearch={(params) => {
        console.log('onSearch ->', params);
      } as any }
    />
  );
};
```

## 更多查询条件

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema3';
export default () => {
  return (
    <Search
      schema={schema}
      toolReverse
      onSearch={(params) => {
        console.log('onSearch ->', params);
      } as any }
    />
  );
};
```

## 默认展开更多查询条件

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema3';
export default () => {
  return (
    <Search
      schema={schema}
      defaultExpand
      toolReverse
      onSearch={(params) => {
        console.log('onSearch ->', params);
      } as any }
    />
  );
};
```

## 使用垂直布局

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema3';
export default () => {
  return (
    <Search
      layout="vertical"
      gridStyle={{
        columnGap: 20,
        rowGap: 0,
      } as any }
      schema={schema}
      onSearch={(params) => {
        console.log('params ->', params);
      } as any }
    />
  );
};
```

## 使用 2 列布局

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema3';
export default () => {
  return (
    <Search
      column={2}
      schema={schema}
      onSearch={(params) => {
        console.log('params ->', params);
      } as any }
    />
  );
};
```

## 使用异步的 options

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'react-core-form';
import schema from './schema/form-search/schema4';
export default () => {
  return (
    <Search
      schema={schema}
      onSearch={(params) => {
        console.log('params ->', params);
      } as any }
    />
  );
};
```

## 基于 Form 扩展 Api

<API src="../../src/search/index.tsx" hideTitle></API>
