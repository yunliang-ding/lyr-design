---
order: 1.5
title: Button 扩展
toc: menu
---

<Alert>

- 在 antd 的 Button 基础上添加了 loading、防止重复点击、及二次确认、角色权限等扩展

</Alert>

## 设置加载防止重复提交

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Button } from 'react-core-form';
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
import { Switch, message } from 'antd';
import { Button } from 'react-core-form';
export default () => {
  const [type, setType] = React.useState('pop');
  const submit = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        message.success('发布成功！');
        res();
      }, 1000);
    });
  };
  return (
    <>
      <Switch
        checkedChildren="alert"
        unCheckedChildren="pop"
        onChange={(v) => {
          setType(v ? 'alert' : 'pop');
        } as any }
      />
      <br />
      <br />
      <Button
        type="primary"
        key={type}
        confirm={{
          title: type === 'alert' ? '提示下' : '是否确认发布?',
          content: '是否确认发布?',
          okText: '确认',
          cancelText: '取消',
          type,
        } as any }
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
import { message } from 'antd';
import { Button, Form } from 'react-core-form';
export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        message.success('发布成功！');
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
          await form.validateFields();
        } as any }
        confirm={{
          title: '提示下',
          content: '是否确认发布?',
        } as any}
        onClick={submit}
      >
        提交
      </Button>
    </>
  );
};
```

## 与 CreateForm 整合

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { message, Space } from 'antd';
import { Button, Form } from 'react-core-form';
import schema from './schema/form-submit/schema';
const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));

export default () => {
  const onSubmit = async (values) => {
    await delay(400);
    message.success('保存成功');
    // return Promise.reject(); // 阻止关闭
  };
  return (
    <Space>
      <Button
        modalFormProps={{
          title: '添加用户',
          schema,
          onSubmit,
          modalProps: {
            bodyStyle: {
              height: 500,
              overflow: 'auto',
            },
          },
        } as any }
        type="primary"
      >
        打开 ModalForm
      </Button>
      <Button
        drawerFormProps={{
          width: 600,
          title: '添加用户',
          schema,
          onSubmit,
        } as any }
      >
        打开 DrawerForm
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
import { Button } from 'react-core-form';
import { Tag } from 'antd';

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
        <Tag color="success">您具有删除用户的权限</Tag>
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
        <Tag color="success">您具有删除应用的权限</Tag>
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
