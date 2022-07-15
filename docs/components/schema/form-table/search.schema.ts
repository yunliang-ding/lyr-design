export default {
  column: 4,
  schema: [
    {
      type: 'Select',
      name: 'level',
      label: '级别',
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
      label: '性别',
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
      type: 'InputNumber',
      name: 'age',
      label: '年纪',
      expand: true,
    },
    {
      type: 'Input',
      name: 'address',
      label: '地址',
      expand: true,
    },
  ],
};
