---
order: 2
title: Form 基本用法
toc: menu
---

## 使用数据模型渲染

```tsx
/**
 * title: 默认采用垂直布局，使用水平布局设置layout为horizontal
 */
import React, { useState } from 'react';
import { Form } from 'react-core-form';
import schema from './schema/form-base/schema';
export default () => {
  return (
    <Form
      column={2}
      schema={schema}
      onValuesChange={(value, values) => {
        console.log('onValuesChange ->', value, values);
      }}
    />
  );
};
```

## 使用 column 等份布局

```tsx
import React, { useState } from 'react';
import { Form } from 'react-core-form';
import schema from './schema/form-base/schema';
import { Select } from 'antd';
export default () => {
  const [column, setColumn] = useState(2);
  return (
    <div>
      <Select
        value={column}
        options={[1, 2, 3].map((i) => {
          return { label: i + '列', value: i };
        })}
        onChange={setColumn}
      />
      <Form
        layout="horizontal"
        column={column}
        schema={schema}
        onValuesChange={(value, values) => {
          console.log('onValuesChange ->', value, values);
        }}
      />
    </div>
  );
};
```

## 使用 BlockQuote 平级划分区块

```tsx
import React from 'react';
import { Form } from 'react-core-form';
import schema from './schema/form-base/schema1';
export default () => {
  return (
    <Form
      column={2}
      schema={schema}
      onValuesChange={(value, values) => {
        console.log('onValuesChange ->', value, values);
      }}
    />
  );
};
```

## 使用 FieldSet 父子级划分区块

```tsx
/**
 * background: '#f6f7f9'
 * title: 通过FieldSet组件可以支持区块划分，在每个独立的区块中仍然可以使用灵活布局，多列布局。
 * desc: 吐出的数据格式按照层级会自动划分 规定必须有name属性
 */
import React from 'react';
import { Form } from 'react-core-form';
// import schema from './schema/form-base/schema2';
import { Button } from 'antd';
export default () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        column={2}
        schema={[]}
        onValuesChange={(value, values) => {
          console.log('onValuesChange ->', value, values);
        }}
        form={form}
        initialValues={{
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
        }}
      />
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          alert(JSON.stringify(form.getValues()));
        }}
      >
        提交
      </Button>
    </div>
  );
};
```

## 使用 disabled、readOnly

```tsx
/**
 * title: 说明
 * desc: 我们将表单的disabled属性穿透到每一个字段中，指定了readOnly属性的表单则会渲染只读组件，即我们在每个小组件中控制了2中模式，详情和编辑。具体使用参看高级用法（自定义组件）
 */
import React from 'react';
import { Form } from 'react-core-form';
import schema from './schema/form-base/schema';
import { Switch } from 'antd';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  return (
    <>
      <Switch
        checkedChildren="disabled"
        unCheckedChildren="disabled"
        onChange={setDisabled}
      />
      &nbsp; &nbsp;
      <Switch
        checkedChildren="readOnly"
        unCheckedChildren="readOnly"
        onChange={setReadOnly}
      />
      <br />
      <br />
      <Form
        column={2}
        schema={schema}
        onValuesChange={(value, values) => {
          console.log('onValuesChange ->', value, values);
        }}
        disabled={disabled}
        readOnly={readOnly}
        readOnlyEmptyValueNode={<span style={{ color: '#999' }}>暂无数据</span>}
        initialValues={{
          input: '这是默认值',
          countInput: 'hello123',
          password: 'qazwsx',
          inputNumber: '50',
          textArea: '浙江省杭州市',
          select: 1,
          radioGroup: 1,
          checkGroup: [2],
          selectMore: [1, 2],
          switch: true,
          slider: 60,
          rate: 3,
          treeSelect: '0-0-1',
          cascader: ['zhejiang', 'hangzhou'],
          datePicker: '2021-05-18',
          startDate: '2021-05-18',
          endDate: '2021-06-18',
          startDate1: '2021-06-18',
          endDate1: '2021-07-18',
          timePicker: '12:08:23',
          startTime: '12:08:23',
          endTime: '23:08:23',
          upload: [
            {
              uid: '1',
              name: 'icon.svg',
              url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            },
          ],
        }}
      />
    </>
  );
};
```

## 使用 span 灵活布局

```tsx
import React, { useState } from 'react';
import { Form } from 'react-core-form';
import schema from './schema/form-base/schema3';
export default () => {
  return <Form schema={schema} column={3} />;
};
```
