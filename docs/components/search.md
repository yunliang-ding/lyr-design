## 基本使用

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema.ts';

export default () => {
  return (
    <Search
      schema={schema}
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={(params) => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 设置文本宽度

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema1.ts';

export default () => {
  return (
    <Search
      schema={schema}
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={(params) => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 按钮顺序调换

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema.ts';

export default () => {
  return (
    <Search
      schema={schema}
      toolReverse
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={(params) => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 设置默认值

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema.ts';

export default () => {
  return (
    <Search
      schema={schema}
      initialValues={{
        level: 1,
        sex: 1,
        date: '2022-02-12',
      }}
      onSearch={(params) => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 外部调用查询

```tsx | react | var(--color-fill-2)
import { Search, Form, Button } from 'lyr-component';
import { Space } from '@arco-design/web-react';
import schema from '@/components/schema/form-search/schema.ts';

export default () => {
  const [form] = Form.useForm();
  return (
    <>
      <Space>
        <Button
          type="primary"
          spin
          onClick={async () => {
            const values = await form.submit();
            console.log('search', values);
          }}
        >
          外部查询
        </Button>
        <Button
          onClick={() => {
            form.reset();
          }}
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

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema.ts';

export default () => {
  return (
    <Search
      schema={schema}
      onSearch={async (params) => {
        await new Promise((res) => setTimeout(res, 1000));
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 设置立即查询

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema2.ts';

export default () => {
  return (
    <Search
      schema={schema}
      onSearch={(params) => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 更多查询条件

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema3.ts';

export default () => {
  return (
    <Search
      schema={schema}
      toolReverse
      onSearch={(params) => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 默认展开更多查询条件

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema3.ts';

export default () => {
  return (
    <Search
      schema={schema}
      defaultExpand
      toolReverse
      onSearch={(params) => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 使用垂直布局

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema3.ts';

export default () => {
  return (
    <Search
      layout="vertical"
      gridStyle={{
        colGap: 20,
        rowGap: 0,
      }}
      schema={schema}
      onSearch={(params) => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 使用 2 列布局

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema3.ts';

export default () => {
  return (
    <Search
      column={2}
      schema={schema}
      onSearch={(params) => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 使用异步的 options

```tsx | react | var(--color-fill-2)
import { Search } from 'lyr-component';
import schema from '@/components/schema/form-search/schema4.ts';

export default () => {
  return (
    <Search
      schema={schema}
      onSearch={(params) => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## API

```API
/src/search/type.tsx
```