---
order: 4.1
title: CreateModal 弹出层提交表单
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { CreateModal, Button } from 'react-core-form';
import schema from './schema/form-submit/schema';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '新增用户',
          modalProps: {
            style: {
              width: 800,
            },
          },
          schema,
          column: 2,
          async onSubmit(values) {
            alert(JSON.stringify(values));
          },
        }).open();
      }}
    >
      打开一个Modal
    </Button>
  );
};
```

## 手动关闭和阻止关闭

```tsx
import React from 'react';
import { CreateModal, Button } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Message } from '@arco-design/web-react';

export default (props) => {
  return (
    <Button
      type="dashed"
      onClick={() => {
        const modal = CreateModal({
          title: '新增用户',
          modalProps: {
            style: {
              width: 800,
            },
          },
          schema,
          column: 2,
          actions: [
            {
              label: '手动关闭',
              onClick() {
                modal.close();
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
        modal.open();
      }}
    >
      手动关闭和阻止关闭
    </Button>
  );
};
```

## CreateModal 自定义渲染

```tsx
import React from 'react';
import { CreateModal, Button } from 'react-core-form';
import { Message } from '@arco-design/web-react';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '自定义渲染',
          confirmText: '确认',
          bodyStyle: {
            height: 200,
          },
          onSubmit() {
            Message.success('确认完毕');
          },
        }).open({
          render: ({ value }) => {
            return <h4>这个是详情页面可用自定义渲染</h4>;
          },
        });
      }}
    >
      自定义渲染Modal
    </Button>
  );
};
```

## CreateModal 扩展属性

<API src="../../src/form-submit/modal-form/index.tsx" hideTitle></API>
