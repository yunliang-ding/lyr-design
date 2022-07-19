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
          'fieldset-1': {
            input: '这是默认值',
            inputNumber: 12,
            select: 1,
            checkGroup: [1],
            radioGroup: 1,
            selectMore: [2],
          },
          'fieldset-1-sub': {
            'input-sub': 'sub',
            'inputNumber-sub': 12,
            'date-sub': '2022-05-18',
          },
          'fieldset-2': {
            switch: true,
            rate: 2,
            slider: 36,
            treeSelect: '0-0',
            cascader: ['zhejiang', 'hangzhou'],
          },
          'fieldset-3': {
            datePicker: '2022-01-10',
            rangePickerStart: '2022-02-16',
            rangePickerEnd: '2022-03-01',
            timePicker: '12:03:00',
            timeRangeStart: '2022-01-17',
            timeRangeEnd: '2022-01-19',
          },
          'fieldset-4': {
            input1: '12',
            'fieldset-4-1': {
              input2: '1223',
              'fieldset-4-2': { input3: '2323' },
            },
          },
        }
      }}
    />
  );
};
```

## API

<API src="../../src/anchor-card-form/index.tsx" hideTitle></API>
