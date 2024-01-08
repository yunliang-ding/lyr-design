---
order: 4.3
title: AnchorCardForm 电梯表单
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { AnchorCardForm, Button } from 'lyr-design';

export default () => {
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };
  return (
    <AnchorCardForm
      fixHeight={256} // 偏移量
      height={460} // 容器高度
      defaultActivityKey="baseInfo"
      formProps={{
        title: '我是电梯表单',
        schema: [
          {
            type: 'FieldSet',
            name: 'baseInfo',
            label: '基础表单',
            props: {
              column: 2,
              subTitle: '这个是一个描述信息...',
              extra: [
                <Button type="outline" key="operation">
                  操作区域
                </Button>,
                <Button type="outline" key="more">
                  更多操作
                </Button>,
              ],
              children: [
                {
                  type: 'Input',
                  name: 'input',
                  label: '输入框',
                  required: true,
                },
                {
                  type: 'InputNumber',
                  name: 'inputNumber',
                  label: '数字输入框',
                },
                {
                  type: 'Select',
                  name: 'select',
                  label: '下拉选',
                  props: {
                    options: [
                      { label: '选项1', value: 1 },
                      { label: '选项2', value: 2 },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'FieldSet',
            name: 'advanceInfo',
            label: '高级表单',
            props: {
              children: [
                {
                  type: 'Switch',
                  name: 'switch',
                  label: '开关切换',
                  valuePropName: 'checked',
                  props: {
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  },
                },
                {
                  type: 'Rate',
                  name: 'rate',
                  label: '评分组件',
                },
                {
                  type: 'Slider',
                  name: 'slider',
                  label: '滑块组件',
                  props: {},
                },
              ],
            },
          },
          {
            type: 'FieldSet',
            name: 'dateInfo',
            label: '日期相关',
            props: {
              children: [
                {
                  type: 'DatePicker',
                  name: 'datePicker',
                  label: '选择日期',
                },
                {
                  type: 'RangePicker',
                  name: 'rangePicker',
                  label: '区间选取',
                },
              ],
            },
          },
          {
            type: 'FieldSet',
            name: 'timeInfo',
            label: '时间相关',
            props: {
              children: [
                {
                  type: 'TimePicker',
                  name: 'timePicker',
                  label: '时间选择',
                },
                {
                  type: 'TimeRange',
                  name: 'timeRange',
                  label: '时间区间',
                },
              ],
            },
          },
        ],
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

<API src="../../src/form-submit/anchor-card-form/index.tsx" hideTitle></API>
