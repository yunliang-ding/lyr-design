import { SchemaProps } from 'lyr-design';

const schema: SchemaProps[] = [
  {
    key: '0001',
    type: 'Input',
    name: 'out1',
    label: '外部元素1',
  },
  {
    key: '0002',
    type: 'Input',
    name: 'out2',
    label: '外部元素2',
  },
  {
    key: '0003',
    type: 'Select',
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
    type: 'FormList',
    name: 'formList',
    label: '子表单',
    required: true,
    span: 3,
    props: {
      label: '子表单数据',
      maxCount: 3, // 最多3条
      leastOne: true, // 至少一条
      column: 3, // 3列
      grid: {
        rowGap: 0,
        colGap: 20,
      },
    },
  },
  {
    key: '0005',
    type: 'Input',
    name: 'out4',
    label: '外部元素4',
  },
  {
    key: '0006',
    type: 'Input',
    name: 'out5',
    label: '外部元素5',
  },
  {
    key: '0007',
    type: 'Select',
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
    type: 'TableList',
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
