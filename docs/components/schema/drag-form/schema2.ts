import { SchemaProps } from 'lyr-component';

const schema: SchemaProps[] = [
  {
    key: '0001',
    widget: 'Input',
    name: 'out1',
    label: '外部元素1',
  },
  {
    key: '0002',
    widget: 'Input',
    name: 'out2',
    label: '外部元素2',
  },
  {
    key: '0003',
    widget: 'Select',
    name: 'out3',
    label: '外部元素3',
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
  {
    key: '0004',
    widget: 'FormList',
    name: 'formList',
    label: '子表单',
    required: true,
    span: 3,
    props: {
      label: '子表单数据',
      maxCount: 3, // 最多3条
      leastOne: true, // 至少一条
      column: 3, // 3列
      children: [],
      grid: {
        rowGap: 0,
        colGap: 20,
      },
    },
  },
  {
    key: '0005',
    widget: 'Input',
    name: 'out4',
    label: '外部元素4',
  },
  {
    key: '0006',
    widget: 'Input',
    name: 'out5',
    label: '外部元素5',
  },
  {
    key: '0007',
    widget: 'Select',
    name: 'out6',
    label: '外部元素6',
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
  {
    key: '0008',
    widget: 'TableList',
    name: 'tableList',
    label: '子表格',
    required: true,
    span: 3,
    props: {
      showNo: false,
      maxCount: 3, // 最多3条
      leastOne: true, // 至少一条
    },
  },
];
export default schema;
