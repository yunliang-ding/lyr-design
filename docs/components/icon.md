---
order: 1.5
title: Icon 字体图标
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { copyToClipBoard } from 'react-core-form-tools';
import { Icon } from 'react-core-form';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      {[
        'react',
        'drag',
        'drag3',
        'delete',
        'copy',
        'add',
        'fullScreen',
        'fullScreenExit',
        'arrow',
        'loading',
        'close',
        'expand',
        'setting',
        'more',
        'run',
        'drag2',
        'refresh',
        'size',
        'question',
      ].map((icon) => {
        return (
          <Icon
            type={icon}
            key={icon}
            onClick={async () => {
              await copyToClipBoard(`<Icon type='${icon}' />`);
            }}
          />
        );
      })}
    </Space>
  );
};
```

## hover 动画

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { copyToClipBoard } from 'react-core-form-tools';
import { Icon } from 'react-core-form';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      {Icon.getIcons().map((icon) => {
        return (
          <Icon
            type={icon}
            hover
            key={icon}
            onClick={async () => {
              await copyToClipBoard(`<Icon type='${icon}' hover />`);
            }}
          />
        );
      })}
    </Space>
  );
};
```

## spin 旋转

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { copyToClipBoard } from 'react-core-form-tools';
import { Icon } from 'react-core-form';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      {Icon.getIcons().map((icon) => {
        return (
          <Icon
            type={icon}
            spin
            key={icon}
            onClick={async () => {
              await copyToClipBoard(`<Icon type='${icon}' spin />`);
            }}
          />
        );
      })}
    </Space>
  );
};
```

## theme 主题色

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { copyToClipBoard } from 'react-core-form-tools';
import { Icon } from 'react-core-form';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      {Icon.getIcons().map((icon) => {
        return (
          <Icon
            type={icon}
            primary
            key={icon}
            onClick={async () => {
              await copyToClipBoard(`<Icon type='${icon}' primary />`);
            }}
          />
        );
      })}
    </Space>
  );
};
```

## API

<API src="../../src/icon/index.tsx" hideTitle></API>
