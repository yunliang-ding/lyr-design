---
order: 4.2
title: CreateDrawer 抽屉提交表单
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { Button, CreateDrawer } from 'react-core-form';
import schema from './schema/form-submit/schema';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateDrawer({
          title: '新增用户',
          onSubmit,
          schema,
        }).open();
      }}
    >
      打开一个Drawer
    </Button>
  );
};
```

## 自定义渲染底部按钮

```tsx
import React from 'react';
import { CreateDrawer } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button, Space } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        const myDrawer = CreateDrawer({
          title: '新增用户',
          schema,
        });
        myDrawer.open({
          footerRender: (form) => {
            return (
              <Space>
                <a>这个是一个描述信息</a>
                <Button onClick={myDrawer.close}>取消</Button>
                <Button
                  type="primary"
                  ghost
                  onClick={async () => {
                    const data = await form.submit();
                    const res = await delay(1000);
                    if (res) {
                      message.success('保存成功');
                    }
                    myDrawer.close(); // 关闭
                  }}
                >
                  提交
                </Button>
              </Space>
            );
          },
        });
      }}
    >
      自定义渲染Drawer底部按钮
    </Button>
  );
};
```

## CreateDrawer 扩展属性

<API src="../../src/form-submit/drawer-form/index.tsx" hideTitle></API>
