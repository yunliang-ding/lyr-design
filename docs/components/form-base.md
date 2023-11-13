---
order: 2.1
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
import { Select } from '@arco-design/web-react';

export default () => {
  const [column, setColumn] = useState(2);
  return (
    <div>
      <Select
        value={column}
        style={{ width: 100 }}
        options={[1, 2, 3].map((i) => {
          return { label: i + '列', value: i };
        })}
        onChange={setColumn}
      />
      <br />
      <br />
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
import { Button, Form } from 'react-core-form';
import schema from './schema/form-base/schema2';

export default () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        column={2}
        schema={schema}
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
import { Form, Button } from 'react-core-form';
import schema from './schema/form-base/schema';
import { Switch } from '@arco-design/web-react';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  return (
    <>
      <Switch
        checkedText="disabled"
        uncheckedText="disabled"
        onChange={setDisabled}
      />
      &nbsp; &nbsp;
      <Switch
        checkedText="readOnly"
        uncheckedText="readOnly"
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
          password: 'qazwsx',
          rangeInputNumber: [12, 34],
          rangeInput: ['react', 'core-form'],
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
          startDate1: '2022-03-18',
          endDate1: '2022-04-18',
          startDate: '2022-05-18',
          endDate: '2022-06-18',
          timePicker: '15:08:23',
          startTime: '15:08:23',
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

## 复选框扩展支持全选

```tsx
import React from 'react';
import { Form } from 'react-core-form';

export default () => {
  return (
    <Form
      initialValues={{
        likes: [1, 2],
        ranges: [1, 2, 3, 4],
      }}
      schema={[
        {
          type: 'CheckGroup',
          name: 'likes',
          label: '个人爱好',
          props: {
            showCheckAll: true,
            options: [
              { label: '洗澡', value: 1 },
              { label: '游戏', value: 2 },
              { label: '看书', value: 3 },
              { label: '运动', value: 4 },
            ],
          },
        },
        {
          type: 'CheckGroup',
          name: 'ranges',
          label: '管理范围',
          props: {
            showCheckAll: {
              text: '选择全部',
            },
            options: [
              { label: '前端开发', value: 1 },
              { label: '后端开发', value: 2 },
              { label: '测试人员', value: 3 },
              { label: '产品设计', value: 4 },
            ],
          },
        },
      ]}
    />
  );
};
```
