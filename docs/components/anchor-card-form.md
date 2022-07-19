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
  return (
    <AnchorCardForm
      fixHeight={193} // 偏移量
      height={460} // 容器高度
      defaultActivityKey="baseInfo"
      formProps={{
        schema,
        onSubmit,
        initialValues: {
          baseInfo: { inputNumber: 2323, select: 2 },
          advanceInfo: { switch: true, rate: 3, slider: 30 },
          dateInfo: {
            datePicker: '2022-02-12',
            rangePickerStart: '2022-09-12',
            rangePickerEnd: '2022-12-12',
          },
          timeInfo: {
            timeRangeStart: '01:23:12',
            timeRangeEnd: '12:23:12',
            timePicker: '09:23:12',
          },
        },
      }}
    />
  );
};
```

## API

<API src="../../src/anchor-card-form/index.tsx" hideTitle></API>
