---
order: 16
title: CheckAppVersion 更新版本
toc: menu
---

## 基本使用

- 通常在系统是有更新的时候，给用户提示

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { CheckAppVersion } from 'react-core-form';

export default () => {
  React.useEffect(() => {
    const destroy = CheckAppVersion({
      time: 3, // 3秒查一次、默认5秒轮训间隔
      text: '检测到文档内容有更新，是否刷新页面加载最新版本',
      // 获取远程资源更新的时间，当大于当前时间就会出发提示
      remoteCdnUpdateTime: async () => {
        return new Date().getTime() + 1;
      },
    });
    return destroy;
  }, []);
  return <div>这里是 app 首页</div>;
};
```

## API

<API src="../../src/check-app-version/index.tsx" hideTitle></API>
