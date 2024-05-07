import React from 'react';
import { SchemaProps, Button } from 'lyr-component';

const schema: SchemaProps[] = [
  {
    widget: 'FieldSet',
    span: 2, // 占据2列
    label: '基础表单',
    props: {
      column: 3, // 子元素3等份排
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
          widget: 'Input',
          name: 'input',
          label: '输入框',
        },
        {
          widget: 'InputNumber',
          name: 'inputNumber',
          label: '数字输入框',
          props: {
            min: 1,
            max: 999,
          },
        },
        {
          widget: 'Select',
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
          widget: 'CheckGroup',
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
          widget: 'RadioGroup',
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
          widget: 'Select',
          name: 'selectMore',
          label: '下拉多选',
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
    widget: 'FieldSet',
    label: '高级表单',
    span: 2,
    props: {
      column: 2,
      children: [
        {
          widget: 'Switch',
          name: 'switch',
          label: '开关切换',
          props: {
            checkedText: '开启',
            uncheckedText: '关闭',
          },
        },
        {
          widget: 'Rate',
          name: 'rate',
          label: '评分组件',
        },
        {
          widget: 'Slider',
          name: 'slider',
          label: '滑块组件',
        },
        {
          widget: 'TreeSelect',
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
          widget: 'Cascader',
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
          widget: 'OssFileUpload',
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
    widget: 'FieldSet',
    label: '日期相关',
    props: {
      column: 2,
      children: [
        {
          widget: 'DatePicker',
          name: 'datePicker',
          label: '选择日期',
        },
        {
          widget: 'RangePicker',
          name: 'rangePicker',
          label: '区间选取',
        },
        {
          widget: 'TimePicker',
          name: 'timePicker',
          label: '时间选择',
        },
        {
          widget: 'TimeRange',
          name: 'timeRange',
          label: '时间区间',
        },
      ],
    },
  },
  {
    widget: 'FieldSet',
    label: '无限嵌套',
    props: {
      column: 2, // 内容2等份排
      children: [
        {
          widget: 'Input',
          name: 'input1',
          label: '第一层',
        },
        {
          widget: 'FieldSet',
          span: 2,
          label: '无限嵌套',
          props: {
            column: 2,
            children: [
              {
                widget: 'Input',
                name: 'input2',
                label: '第二层',
              },
              {
                widget: 'FieldSet',
                span: 2,
                label: '无限嵌套',
                props: {
                  column: 2,
                  children: [
                    {
                      widget: 'Input',
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
];
export default schema;
