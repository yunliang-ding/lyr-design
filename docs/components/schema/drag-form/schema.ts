import { SchemaProps } from 'lyr-design';

const schema: SchemaProps[] = [
  {
    key: '0001',
    type: 'BlockQuote',
    props: {
      title: '基础表单',
    },
  },
  {
    key: '0002',
    type: 'Input',
    name: 'input',
    label: '输入框',
  },
  {
    key: '0003',
    type: 'InputNumber',
    name: 'inputNumber',
    label: '数字输入框',
    props: {
      min: 1,
      max: 999,
    },
  },
  {
    key: '0004',
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
    key: '0005',
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
    key: '0006',
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
    key: '0007',
    type: 'BlockQuote',
    props: {
      title: '复杂表单',
      subTitle: '(扩展表单)',
    },
  },
  {
    key: '0008',
    type: 'Switch',
    name: 'switch',
    label: '开关切换',
    props: {
      checkedText: '开启',
      uncheckedText: '关闭',
    },
  },
  {
    key: '0009',
    type: 'Rate',
    name: 'rate',
    label: '评分组件',
  },
  {
    key: '0010',
    type: 'Slider',
    name: 'slider',
    label: '滑块组件',
  },
];
export default schema;
