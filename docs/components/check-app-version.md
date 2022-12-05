---
order: 22
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
      time: 3,
      text: '检测到文档内容有更新，是否刷新页面加载最新版本',
      request: async () => {
        console.log('auto check');
        return true;
      },
    });
    return destroy;
  }, []);
  return <div>这里是 app 首页</div>;
};
```
