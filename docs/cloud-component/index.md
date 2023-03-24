---
order: 24
title: CloudComponent 云组件
toc: menu
sidemenu: false
nav:
  title: 云组件
  order: 3
---

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CloudComponent } from 'react-core-form';
import './index.less';

export default () => {
  return (
    <CloudComponent
      onSave={(code) => {
        message.success('组件保存成功，打开控制台查看打印信息');
        console.log(code, CloudComponent.parseCodeToReactComponent(code));
      }}
      initialComponent={[
        {
          componentName: 'App1',
          react: `export default (props) => {
  return <div className='App1'>
    {props.name}
  </div>
}`,
          less: `.App1{
  color: red
}`,
          props: {
            name: 'App1',
          },
        },
        {
          componentName: 'App2',
          react: `export default (props) => {
  return <div className='App2'>
    {props.name}
  </div>
}`,
          less: `.App2{
  color: red
}`,
          props: {
            name: 'App2',
          },
        },
      ]}
    />
  );
};
```
