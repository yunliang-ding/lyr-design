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
          name: 'uuid',
          type: 'javascript',
          content: `window.uuid = (size) => {
  return Math.random().toString().substr(2, size);
}`,
        },
        {
          name: 'style',
          type: 'less',
          content: `body{
  div{
    font-size: 12px;
  }
}`,
        },
        {
          name: 'tools',
          type: 'react',
          content: `export default {
  sum: (a, b) => {
    return a + b
  }
}`,
        },
      ]}
      initialComponent={[
        {
          componentName: 'Demo',
          react: `import uuid from 'uuid';
import tools from 'tools';

export default () => {
  return [uuid(10), tools.sum(11, 22)].join(',')
}`,
          less: `.demo{
  color: #666
}`,
          props: {},
          open: true,
          selected: true,
        },
      ]}
      onLog={(msg) => {
        console.log('加载日志:', msg);
      }}
      onAdd={async (code) => {
        await new Promise((res) => setTimeout(res, 1000));
        return Math.random();
      }}
      onSave={async (code, require) => {
        console.log(code, require);
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
