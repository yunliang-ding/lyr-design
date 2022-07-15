export default {
  maxCount: 5, // 最多5条
  schema: [
    {
      type: 'Input',
      name: 'name',
      label: '姓名',
      required: true,
    },
    {
      type: 'Select',
      name: 'sex',
      label: '性别',
      required: true,
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
      type: 'Input',
      name: 'age',
      label: '年纪',
      effect: ['sex'],
      isVisible: ({ sex }) => sex === 0,
    },
    {
      type: 'Input',
      name: 'phone',
      label: '手机号',
    },
    {
      type: 'Input',
      name: 'address',
      label: '地址',
    },
  ],
};
