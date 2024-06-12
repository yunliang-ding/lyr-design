import { SchemaProps } from 'lyr-component';

const schema: SchemaProps<{}>[] = [
  {
    widget: 'Input',
    name: 'input',
    label: '输入框',
    required: true,
  },
  {
    widget: 'Password',
    name: 'password',
    label: '密码输入框',
  },
  {
    widget: 'RangeInput',
    name: 'rangeInputNumber',
    label: '区间数字输入框',
    required: true,
  },
  {
    widget: 'RangeInput',
    name: 'rangeInput',
    label: '区间输入框',
    required: true,
    props: {
      mode: 'Input',
    },
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
      fieldNames: {
        label: 'title',
        value: 'id',
      },
      options: [
        { title: '选项1', id: 1 },
        { title: '选项2', id: 2 },
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
    widget: 'ColorPicker',
    name: 'colorPicker',
    label: '颜色选择器',
    required: true,
    props: {
      showText: true,
    },
  },
  {
    widget: 'VerificationCode',
    name: 'verificationCode',
    label: '验证码',
    required: true,
  },
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
    widget: 'Select',
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
    widget: 'TreeSelect',
    name: 'treeSelect',
    label: '树形选择器',
    props: {
      treeData: [
        {
          title: 'Node1',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              key: 1,
            },
            {
              title: 'Child Node2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          key: '0-1',
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
          label: '浙江省',
          children: [
            {
              value: 'hangzhou',
              label: '杭州市',
            },
          ],
        },
      ],
    },
  },
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
    props: {
      splitLabel: '至',
    },
  },
  {
    widget: 'TextArea',
    name: 'textArea',
    label: '多文本',
  },
  {
    widget: 'OssFileUpload',
    name: 'file',
    label: '上传图片',
    props: {
      listType: 'picture-card',
    },
  },
];
export default schema;
