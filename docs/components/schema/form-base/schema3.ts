import { SchemaProps } from 'react-core-form';

const schema: SchemaProps[] = [
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
      min: 0,
      max: 100,
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
    type: 'RadioGroup',
    name: 'radioGroup',
    label: '单选框',
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
    type: 'Switch',
    name: 'switch',
    label: '开关',
    props: {
      checkedText: '开启',
      uncheckedText: '关闭',
    },
  },
  {
    type: 'Rate',
    name: 'rate',
    label: '评分',
  },
  {
    type: 'Slider',
    name: 'slider',
    label: '滑块',
  },
  {
    type: 'Select',
    name: 'selectMore',
    label: '下拉多选',
    props: {
      mode: 'multiple',
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项2', value: 3 },
      ],
    },
  },
  {
    type: 'TreeSelect',
    name: 'treeSelect',
    label: '下拉树',
    // 占据2个单位
    span: 2,
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
    label: '级联选择',
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
    type: 'DatePicker',
    name: 'datePicker',
    label: '日期选择',
  },
  {
    type: 'RangePicker',
    name: 'rangePicker',
    label: '区间选择',
    // 占据2个单位
    span: 2,
  },
  {
    type: 'TimePicker',
    name: 'timePicker',
    label: '时间选择',
    span: 2,
  },
  {
    type: 'TimeRange',
    name: 'timeRange',
    label: '时间区间',
  },
  {
    // 占据3个单位
    span: 3,
    type: 'TextArea',
    name: 'textArea',
    label: '多文本',
  },
  {
    type: 'OssFileUpload',
    name: 'file',
    label: '上传图片',
    props: {
      listType: 'picture-card',
    },
  },
];
export default schema;
