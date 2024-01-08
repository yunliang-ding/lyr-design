---
order: 1.5
title: Button 扩展
toc: menu
---

## arco.design 的 Button 基础上扩展了如下

<Alert>

- 自动 loading
- 二次确认
- 继承弹框、抽屉
- 权限控制

</Alert>

## 设置加载防止重复提交

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Button } from 'lyr-design';

export default () => {
  const submit = async () => {
    return new Promise((res) => setTimeout(res, 1000));
  };
  return (
    <Button type="primary" spin onClick={submit}>
      点我提交
    </Button>
  );
};
```

## 设置二次确认提示

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Message, Switch } from '@arco-design/web-react';
import { Button } from 'lyr-design';

export default () => {
  const [type, setType] = React.useState('pop');
  const submit = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        Message.success('发布成功！');
        res();
      }, 1000);
    });
  };
  return (
    <>
      <Switch
        checkedText="alert"
        uncheckedText="pop"
        onChange={(v) => {
          setType(v ? 'alert' : 'pop');
        }}
      />
      <br />
      <br />
      <Button
        type="primary"
        confirm={{
          title: '提示',
          content: '是否确认发布?',
          type,
        }}
        onClick={submit}
      >
        开始部署
      </Button>
    </>
  );
};
```

## 设置二次确认提示前置校验

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Message } from '@arco-design/web-react';
import { Button, Form } from 'lyr-design';
export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        Message.success('发布成功！');
        res();
      }, 1000);
    });
  };
  return (
    <>
      <Form
        form={form}
        schema={[
          {
            type: 'Input',
            required: true,
            name: 'username',
            label: '用户名称',
            style: { width: 300 },
          },
        ]}
      />
      <Button
        type="primary"
        onBeforeClick={async () => {
          await form.validate();
        }}
        confirm={
          {
            title: '提示下',
            content: '是否确认发布?',
          } as any
        }
        onClick={submit}
      >
        提交
      </Button>
    </>
  );
};
```

## 和弹出层整合

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Message, Space } from '@arco-design/web-react';
import { Button, Form } from 'lyr-design';
import schema from './schema/form-submit/schema';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));

export default () => {
  const onSubmit = async (values) => {
    await delay(400);
    Message.success('保存成功');
    // return Promise.reject(); // 阻止关闭
  };
  return (
    <Space>
      <Button
        modalFormProps={{
          title: '添加用户',
          schema,
          onSubmit,
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        type="primary"
      >
        打开 ModalForm
      </Button>
      <Button
        spin
        drawerFormProps={async () => {
          await new Promise((res) => setTimeout(res, 2000));
          return {
            title: '添加用户',
            width: 600,
            schema,
            onSubmit,
          };
        }}
      >
        打开 DrawerForm 支持异步
      </Button>
    </Space>
  );
};
```

## 与 Tooltip 整合

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Button } from 'lyr-design';
import { Space } from '@arco-design/web-react';

export default () => {
  return (
    <Space>
      <Button tooltip="我是提示文案" type="primary">
        鼠标移入显示提示
      </Button>
      <Button tooltip="我是提示文案" type="text">
        显示提示
      </Button>
      <Button
        tooltip={{
          content: '我是提示文案',
          position: 'right',
        }}
      >
        鼠标移入显示提示
      </Button>
    </Space>
  );
};
```

## 配置权限体系

```tsx
/**
 * background: '#fff'
 * title: 说明
 * description: 通常在启动入口请求接口数据，之后注入按钮权限数据，一次注入可全局使用。
 */
import * as React from 'react';
import { Button } from 'lyr-design';
import { Tag } from '@arco-design/web-react';

// 代表当前用户配置了若干个按钮权限
Button.setAuth({
  'user-management-create': '新增用户',
  'user-management-retrieve': '详情',
  'user-management-update': '编辑',
  'application-management-create': '新增应用',
  'application-management-retrieve': '详情',
  'application-management-update': '编辑',
  'application-management-delete': '删除',
});

export default () => {
  return (
    <>
      <Button type="primary" auth="user-management-create" />
      <br />
      <br />
      <Button type="primary" auth="user-management-update" />
      <br />
      <br />
      <Button type="primary" auth="user-management-retrieve" />
      <br />
      <br />
      {Button.hasAuth('user-management-delete') ? (
        <Tag color="green">您具有删除用户的权限</Tag>
      ) : (
        <Tag color="red">您暂无删除用户的权限</Tag>
      )}
      <br />
      <br />
      <Button type="primary" auth="application-management-create" />
      <br />
      <br />
      <Button type="primary" auth="application-management-update" />
      <br />
      <br />
      <Button type="primary" auth="application-management-delete" />
      <br />
      <br />
      {Button.hasAuth('application-management-delete') ? (
        <Tag color="green">您具有删除应用的权限</Tag>
      ) : (
        <Tag color="red">您暂无删除应用的权限</Tag>
      )}
    </>
  );
};
```

## API

<API src="../../src/button/index.tsx" hideTitle></API>

## 方法扩展

| **属性名** | **描述**               | **类型**                    | **默认** |
| ---------- | ---------------------- | --------------------------- | -------- |
| setAuth    | 设置按钮权限           | `(auths: string) => void`   | 无       |
| getAuth    | 获取按钮权限           | `() => auths`               | 无       |
| hasAuth    | 判断是否具有该按钮权限 | `(auth: string) => boolean` | 无       |
