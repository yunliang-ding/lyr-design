import { SchemaProps } from 'lyr-component';

const schema: SchemaProps[] = [
  {
    widget: 'Select',
    name: 'level',
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
    widget: 'Select',
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
    widget: 'DatePicker',
    name: 'date',
    label: '选择入职日期',
    // 定制布局
    labelCol: {
      style: {
        width: 120,
      },
    },
    props: {
      style: {
        width: 180,
      },
    },
  },
];
export default schema;
