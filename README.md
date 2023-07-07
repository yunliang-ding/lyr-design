## 安装

组件库本身依赖 ant design，使用需要同时安装 antd，在 src/global.less 中全量引入 antd less 文件

```shell
npm install react-core-form --save
```

```less
@import '~antd/dist/antd.less';
```

## 基本使用

```tsx
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      schema={[
        {
          type: 'Input',
          label: '姓名',
          name: 'name',
          required: true,
        },
        {
          type: 'Select',
          label: '爱好',
          name: 'liked',
          required: true,
          props: {
            options: [
              {
                label: '爱好1',
                value: 0,
              },
              {
                label: '爱好2',
                value: 1,
              },
            ],
          },
        },
      ]}
    />
  );
};
```

## 使用异步选择器

```tsx
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      schema={[
        {
          type: 'AsyncSelect',
          label: '爱好',
          name: 'liked',
          required: true,
          props: {
            options: async () => {
              await new Promise((res) => setTimeout(res, 1000));
              return [
                {
                  label: '爱好1',
                  value: 0,
                },
                {
                  label: '爱好2',
                  value: 1,
                },
              ];
            },
          },
        },
      ]}
    />
  );
};
```

## 使用设置联动

```tsx
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      schema={[
        {
          type: 'RadioGroup',
          label: '性别',
          name: 'sex',
          props: {
            options: [
              {
                label: '男',
                value: 0,
              },
              {
                label: '女',
                value: 1,
              },
            ],
          },
        },
        {
          type: 'InputNumber',
          label: '年龄',
          name: 'age',
          effect: ['sex'],
          visible: ({ sex }) => sex === 0,
        },
      ]}
    />
  );
};
```

## 使用自定义渲染

```tsx
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      schema={[
        {
          label: '性别',
          name: 'userList',
          type: ({ value, onChange, form, ...props }) => {
            return <div>自定义渲染</div>;
          },
        },
        {
          type: 'Render',
          props: {
            render(form) {
              return <div>render</div>;
            },
          },
        },
        {
          type: 'AsyncRender',
          props: {
            async render(form) {
              await new Promise((res) => setTimeout(res, 1000));
              return <div>render</div>;
            },
          },
        },
        {
          type: 'MyWidget',
          name: 'my-widget',
          props: {},
        },
      ]}
      widgets={{
        MyWidget: ({ value, onChange, form, ...props }) => {
          return <div>my-widget</div>;
        },
      }}
    />
  );
};
```

## 在线文档

[点击跳转文档](http://server.yunliang.cloud/website/react-core-form)
