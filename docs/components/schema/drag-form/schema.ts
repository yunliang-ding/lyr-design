import { SchemaProps } from 'lyr-component';

const schema: SchemaProps[] = [
  {
    key: '0001',
    widget: 'BlockQuote',
    props: {
      title: '基础表单',
    },
  },
  {
    key: '0002',
    widget: 'Input',
    name: 'input',
    label: '输入框',
  },
  {
    key: '0003',
    widget: 'InputNumber',
    name: 'inputNumber',
    label: '数字输入框',
    props: {
      min: 1,
      max: 999,
    },
  },
  {
    key: '0004',
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
    key: '0005',
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
    key: '0006',
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
    key: '0007',
    widget: 'BlockQuote',
    props: {
      title: '复杂表单',
      subTitle: '(扩展表单)',
    },
  },
  {
    key: '0008',
    widget: 'Switch',
    name: 'switch',
    label: '开关切换',
    props: {
      checkedText: '开启',
      uncheckedText: '关闭',
    },
  },
  {
    key: '0009',
    widget: 'Rate',
    name: 'rate',
    label: '评分组件',
  },
  {
    key: '0010',
    widget: 'Slider',
    name: 'slider',
    label: '滑块组件',
  },
];
export default schema;
