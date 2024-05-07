import { SchemaProps } from 'lyr-component';

export default {
  column: 4,
  schema: [
    {
      widget: 'Select',
      name: 'level',
      label: '用户级别',
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
      widget: 'DatePicker',
      name: 'date',
      label: '入职日期',
    },
    {
      widget: 'InputNumber',
      name: 'age',
      label: '用户年纪',
      expand: true,
    },
    {
      widget: 'Input',
      name: 'address',
      label: '用户地址',
      expand: true,
    },
  ] as SchemaProps,
};
