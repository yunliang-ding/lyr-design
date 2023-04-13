---
order: 22
title: SuspendBar 悬浮操作栏
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { Space } from 'antd';
import { SuspendBar, Button } from 'react-core-form';

export default () => {
  const { open, close, hide, show, update } = SuspendBar.create();
  return (
    <Space>
      <Button
        onClick={() => {
          open({
            title: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <span>标题信息</span>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    close();
                  }}
                >
                  关闭
                </span>
              </div>
            ),
            placement: 'left',
            show: true,
            top: '50%',
            bodyStyle: {
              width: 500,
              height: 'calc(100vh - 88px)',
              overflow: 'auto',
              gap: 10,
            },
            content: <div>这是一个类似抽屉的展开收起</div>,
            footer: [<Button>关闭</Button>, <Button>取消</Button>],
          });
        }}
      >
        打开
      </Button>
      <Button
        onClick={() => {
          close();
        }}
      >
        关闭
      </Button>
      <Button
        onClick={() => {
          show();
        }}
      >
        展开
      </Button>
      <Button
        onClick={() => {
          hide();
        }}
      >
        收起
      </Button>
    </Space>
  );
};
```

## Api

<API src="../../src/suspend-bar/index.tsx" hideTitle></API>

```

```
