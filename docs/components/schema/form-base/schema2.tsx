import React from 'react';
import { SchemaProps, Button } from 'react-core-form';

const schema: SchemaProps[] = [
  {
    type: 'FieldSet',
    name: 'fieldset-1',
    span: 2, // 占据2列
    label: '基础表单',
    props: {
      column: 3, // 子元素3等份排
      subTitle: '这个是一个描述信息...',
      extra: [
        <Button type="primary" ghost key="operation">
          操作区域
        </Button>,
        <Button type="primary" ghost key="more">
          更多操作
        </Button>,
      ],
      children: [
        {
          type: 'Input',
          name: 'input',
          label: '输入框',
        },
        {
          type: 'InputNumber',
          name: 'inputNumber',
          label: '数字输入框',
          props: {
            min: 1,
            max: 999,
          },
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
        {
          type: 'CheckGroup',
          name: 'checkGroup',
          label: '复选框',
          props: {
            options: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
            ],
          },
        },
        {
          type: 'RadioGroup',
          name: 'radioGroup',
          label: '单选按钮组',
          props: {
            options: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
            ],
          },
        },
        {
          type: 'Select',
          name: 'selectMore',
          label: '下拉多选',
          effect: ['radioGroup'],
          effectClearField: true,
          visible({ radioGroup }) {
            return radioGroup === 1;
          },
          props: {
            mode: 'multiple',
            options: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
            ],
          },
        },
      ],
    },
  },
  {
    type: 'FieldSet',
    name: 'fieldset-1-sub',
    span: 2, // 占据2列
    label: '基础表单-联动子项',
    effect: ['select'],
    props: {
      children: (form, isBeforeParse) => {
        // 这里注意下，是否是前置解析数据结构
        const selectValue = isBeforeParse
          ? form.initialValues['fieldset-1'].select
          : form.getFieldValue('select');
        if (selectValue === 1) {
          return [
            {
              type: 'Input',
              name: 'input-sub',
              label: '输入框',
            },
            {
              type: 'DatePicker',
              name: 'date-sub',
              label: '日期',
            },
            {
              type: 'InputNumber',
              name: 'inputNumber-sub',
              label: '数字输入框',
              props: {
                min: 1,
                max: 999,
              },
            },
          ];
        } else {
          return [
            {
              type: 'Select',
              name: 'select-sub',
              label: '下拉选',
              props: {
                options: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
                ],
              },
            },
            {
              type: 'CheckGroup',
              name: 'checkGroup-sub',
              label: '复选框',
              props: {
                options: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
                ],
              },
            },
          ];
        }
      },
    },
  },
  {
    type: 'FieldSet',
    name: 'fieldset-2',
    label: '高级表单',
    effect: ['selectMore'],
    visible({ selectMore }) {
      return selectMore?.length !== 2;
    },
    props: {
      column: 2,
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
        },
        {
          type: 'TreeSelect',
          name: 'treeSelect',
          label: '树形选择器',
          props: {
            treeData: [
              {
                title: 'Node1',
                value: '0-0',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-1',
                  },
                  {
                    title: 'Child Node2',
                    value: '0-0-2',
                  },
                ],
              },
              {
                title: 'Node2',
                value: '0-1',
              },
            ],
          },
        },
        {
          type: 'Cascader',
          name: 'cascader',
          label: '级联选择器',
          props: {
            options: [
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'OssFileUpload',
          name: 'file',
          label: '上传图片',
          props: {
            listType: 'picture-card',
          },
        },
      ],
    },
  },
  {
    type: 'FieldSet',
    name: 'fieldset-3',
    label: '日期相关',
    props: {
      column: 2,
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
          nameAlise: ['rangePickerStart', 'rangePickerEnd'],
        },
        {
          type: 'TimePicker',
          name: 'timePicker',
          label: '时间选择',
        },
        {
          type: 'TimeRange',
          name: 'timeRange',
          label: '时间区间',
          nameAlise: ['timeRangeStart', 'timeRangeEnd'],
        },
      ],
    },
  },
  {
    type: 'FieldSet',
    name: 'fieldset-4',
    span: 2, // 占据2列
    label: '无限嵌套',
    props: {
      column: 2, // 内容2等份排
      children: [
        {
          type: 'Input',
          name: 'input1',
          label: '第一层',
        },
        {
          type: 'FieldSet',
          name: 'fieldset-4-1',
          span: 2,
          label: '无限嵌套',
          props: {
            column: 2,
            children: [
              {
                type: 'Input',
                name: 'input2',
                label: '第二层',
              },
              {
                type: 'FieldSet',
                name: 'fieldset-4-2',
                span: 2,
                label: '无限嵌套',
                props: {
                  column: 2,
                  children: [
                    {
                      type: 'Input',
                      name: 'input3',
                      label: '第三层',
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    type: 'FieldSet',
    name: 'fieldset-5',
    span: 2, // 占据2列
    label: '空数据展示',
    props: {
      column: 2,
    },
  },
];
export default schema;
