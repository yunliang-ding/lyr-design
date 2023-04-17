---
order: 24
title: CloudComponent 云组件
toc: menu
nav:
  title: 云组件
  order: 3
---

<Alert>
  基于 code-editor 扩展，支持组件远程或本地存储和渲染
</Alert>

```tsx
import React from 'react';
import { CloudComponent } from 'react-core-form';
import './index.less';

export default () => {
  return (
    <CloudComponent
      initialDependencies={[
        {
          name: 'html2canvas',
          alise: 'html2canvas',
          version: '1.4.1',
          path: 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.js',
        },
        {
          name: 'axios',
          alise: 'html2canvas',
          version: '1.3.5',
          path: 'https://unpkg.com/axios@1.3.5/dist/axios.min.js',
        },
        {
          name: 'jquery',
          alise: 'jQuery',
          version: '3.6.4',
          path: 'https://unpkg.com/jquery@3.6.4/dist/jquery.js',
        },
      ]}
      onLog={(msg) => {
        console.log('加载日志:', msg);
      }}
      onAdd={async (code) => {
        await new Promise((res) => setTimeout(res, 1000));
        return Math.random();
      }}
      onSave={async (code) => {
        console.log(code);
      }}
      onAddDep={async () => {
        await new Promise((res) => setTimeout(res, 1000));
        return {
          id: Math.random(),
        };
      }}
      onUpdateDep={async () => {
        await new Promise((res) => setTimeout(res, 1000));
        return true;
      }}
      // previewRender={(item) => {
      //   return <div style={{ width: '50%', height: '50%'}} >
      //     <iframe
      //       style={{ width: '100%', height: '100%', border: 'none' }}
      //       src={}
      //     />
      //   </div>
      // }}
    />
  );
};
```

## API

<API src="../../src/cloud-component/index.tsx" hideTitle></API>
