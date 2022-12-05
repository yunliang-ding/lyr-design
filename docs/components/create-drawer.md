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

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateDrawer({
          title: '新增用户',
          schema,
          async onSubmit(values) {
            alert(JSON.stringify(values));
          },
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

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateDrawer({
          title: '新增用户',
          schema,
        }).open({
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
                    alert(JSON.stringify(data));
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
