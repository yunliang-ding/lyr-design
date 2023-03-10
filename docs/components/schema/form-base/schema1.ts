import { SchemaProps } from 'react-core-form';

const schema: SchemaProps[] = [
  {
    type: 'BlockQuote',
    props: {
      title: '基础表单',
    },
  },
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
    type: 'Select',
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
  {
    type: 'BlockQuote',
    props: {
      title: '复杂表单',
      subTitle: '(扩展表单)',
    },
  },
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
    type: 'BlockQuote',
    props: {
      label: '日期相关',
      subLabel: '扩展表单',
    },
  },
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
