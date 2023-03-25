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
import { message } from 'antd';
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
          open: true,
          selected: true,
          react: `import { Button } from 'antd';

export default (props) => {
  return <Button className='App1'>
    {props.name}
  </Button>
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
          open: true,
          react: `import { Button } from 'antd';
          
export default (props) => {
  return <Button className='App2'>
    {props.name}
  </Button>
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
