## 使用数据模型渲染

```tsx | react
import { Form } from 'lyr-component';
import schema from '@/components/schema/form-base/schema.ts';

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

```tsx | react
import { useState } from 'react';
import { Form } from 'lyr-component';
import schema from '@/components/schema/form-base/schema.ts';
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

```tsx | react
import { Form } from 'lyr-component';
import schema from '@/components/schema/form-base/schema.ts';

export default () => {
  return (
    <Form
      column={2}
      schema={[
        {
          widget: 'BlockQuote',
          props: {
            title: '区块划分',
          },
        },
        ...schema,
      ]}
      onValuesChange={(value, values) => {
        console.log('onValuesChange ->', value, values);
      }}
    />
  );
};
```

## 使用 FieldSet 父子级划分区块

> 通过 FieldSet 组件可以支持区块划分，在每个独立的区块中仍然可以使用灵活布局，多列布局

```tsx | react
import { Form } from 'lyr-component';
import schema from '@/components/schema/form-base/schema2.tsx';

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
          input: '这是默认值',
          inputNumber: 12,
          select: 1,
          checkGroup: [1],
          radioGroup: 1,
          selectMore: [2],
          switch: true,
          rate: 2,
          slider: 36,
          treeSelect: '0-0-1',
          cascader: ['zhejiang', 'hangzhou'],
          datePicker: '2021-05-18',
          rangePicker: ['2022-03-18', '2022-04-18'],
          timePicker: '15:08:23',
          timeRange: ['15:08:23', '23:08:23'],
          input1: '12',
          input2: '1223',
          input3: '2323',
        }}
      />
    </div>
  );
};
```

## 使用 disabled、readOnly

```tsx | react
import { Form, Button } from 'lyr-component';
import { Switch } from '@arco-design/web-react';
import schema from '@/components/schema/form-base/schema.ts';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  return (
    <div>
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
          colorPicker: '#165dff',
          verificationCode: '999999',
          rangeInput: ['lyr', 'component'],
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
          rangePicker: ['2022-03-18', '2022-04-18'],
          timePicker: '15:08:23',
          timeRange: ['15:08:23', '23:08:23'],
          upload: [
            {
              uid: '1',
              name: 'icon.svg',
              url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            },
          ],
        }}
      />
    </div>
  );
};
```

## 使用 span 灵活布局

```tsx | react
import { Form } from 'lyr-component';
import schema from '@/components/schema/form-base/schema3.ts';

export default () => {
  return <Form schema={schema} column={3} />;
};
```

## 复选框扩展支持全选

```tsx | react
import { Form } from 'lyr-component';

export default () => {
  return (
    <Form
      initialValues={{
        likes: [1, 2],
        ranges: [1, 2, 3, 4],
      }}
      schema={[
        {
          widget: 'CheckGroup',
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
          widget: 'CheckGroup',
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

## API

```API
/src/form/form.type.tsx
```

## Form.Item

```API
/src/form/item.type.tsx
```
