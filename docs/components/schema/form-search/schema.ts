import { SchemaProps } from 'lyr-design';

const schema: SchemaProps[] = [
  {
    type: 'Select',
    name: 'level',
    label: '选择级别',
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
];
export default schema;
