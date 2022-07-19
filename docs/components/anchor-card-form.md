---
order: 15.5
title: AnchorCardForm 电梯表单
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { AnchorCardForm, Button } from 'react-core-form';
import schema from './schema/form-base/schema2';

export default () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  const formProps = {
    schema,
    onSubmit,
  }
  return (
    <AnchorCardForm
      fixHeight={193} // 偏移量
      height={460} // 容器高度
      defaultActivityKey="baseInfo"
      formProps={formProps}
    />
  );
};
```

## API

<API src="../../src/anchor-card-form/index.tsx" hideTitle></API>
