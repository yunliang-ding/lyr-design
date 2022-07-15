import { SchemaProps } from 'react-core-form';

const schema: SchemaProps[] = [
  {
    type: 'Select',
    name: 'level0',
    label: '我的级别',
    props: {
      options: [
        {
          label: '级别1',
          value: 0,
        },
        {
          label: '级别2',
          value: 1,
        },
      ],
    },
  },
  {
    type: 'Select',
    name: 'level',
    label: '级别',
    labelWidth: 52,
    props: {
      options: [
        {
          label: '级别1',
          value: 0,
        },
        {
          label: '级别2',
          value: 1,
        },
      ],
    },
  },
  {
    type: 'Select',
    name: 'sex',
    label: '选择性别',
    labelWidth: 78,
    props: {
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
  },
  {
    type: 'DatePicker',
    name: 'date',
    label: '入职日期',
  },
  {
    type: 'Select',
    name: 'level1',
    label: '级别',
    labelWidth: 52,
    props: {
      placeholder: '级别',
      options: [
        {
          label: '级别1',
          value: 0,
        },
        {
          label: '级别2',
          value: 1,
        },
      ],
    },
  },
  {
    type: 'Select',
    name: 'sex1',
    label: '我的性别',
    props: {
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
  },
  {
    type: 'DatePicker',
    name: 'date2',
    label: '用户入职日期',
  },
];
export default schema;
