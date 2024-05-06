---
order: 4.2
title: CreateDrawer 抽屉提交表单
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { Button, CreateDrawer } from 'lyr-component';
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

## 手动关闭和阻止关闭

```tsx
import React from 'react';
import { Button, CreateDrawer } from 'lyr-component';
import { Message } from '@arco-design/web-react';
import schema from './schema/form-submit/schema';

export default (props) => {
  return (
    <Button
      type="dashed"
      onClick={() => {
        const drawer = CreateDrawer({
          title: '新增用户',
          width: 1000,
          schema,
          column: 2,
          actions: [
            {
              label: '手动关闭',
              onClick() {
                drawer.close();
              },
            },
            {
              label: '手动提交',
              spin: true,
              type: 'primary',
              async onClick(value) {
                await new Promise((res) => setTimeout(res, 1000));
                console.log(value);
                Message.error('接口异常');
                return Promise.reject(); // 阻止关闭
              },
            },
          ],
        });
        drawer.open();
      }}
    >
      手动关闭和阻止关闭
    </Button>
  );
};
```

## CreateDrawer 自定义渲染

```tsx
import React from 'react';
import { Button, CreateDrawer } from 'lyr-component';
import { Message } from '@arco-design/web-react';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateDrawer({
          title: '自定义渲染',
          okText: '确认',
          onSubmit() {
            message.success('确认完毕');
          },
        }).open({
          render: ({ value }) => {
            return <h4>这个是详情页面可用自定义渲染</h4>;
          },
        });
      }}
    >
      自定义渲染 Drawer
    </Button>
  );
};
```

## 自定义渲染底部按钮

```tsx
import React from 'react';
import { CreateDrawer, Button } from 'lyr-component';
import schema from './schema/form-submit/schema';
import { Space } from '@arco-design/web-react';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateDrawer({
          title: '新增用户',
          schema,
          containId: 'footer-render-drawer',
        }).open({
          footerRender: (form) => {
            return (
              <Space>
                <a>这个是一个描述信息</a>
                <Button
                  onClick={() => {
                    CreateDrawer.close('footer-render-drawer');
                  }}
                >
                  取消
                </Button>
                <Button
                  type="outline"
                  onClick={async () => {
                    const data = await form.submit();
                    alert(JSON.stringify(data));
                    CreateDrawer.close('footer-render-drawer'); // 关闭
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
