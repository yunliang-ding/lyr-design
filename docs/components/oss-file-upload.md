---
order: 18
title: OssFileUpload 文件上传
toc: menu
---

<Alert>

- 基于 antd Upload 二次封装

</Alert>

## 依赖 cdn

```js
https://cdn.bootcdn.net/ajax/libs/ali-oss/6.17.1/aliyun-oss-sdk.min.js
```

## 基本使用

```tsx
import React from 'react';
import { OssFileUpload } from 'react-core-form';

export default () => {
  const [value, setValue] = React.useState([]);
  return (
    <OssFileUpload
      value={value}
      onChange={(v) => {
        setValue(v);
        console.log(v);
      }}
    />
  );
};
```

## API

<API src="../../src/oss-file-upload/index.tsx" hideTitle></API>
