import { SchemaProps } from 'lyr-design';

export default {
  maxCount: 5, // 最多5条
  defaultAddValue: () => {
    return {
      name: '默认姓名',
      sex: 0,
      age: 18,
    };
  },
  children: [
    {
      type: 'Input',
      name: 'name',
      label: '姓名',
      required: true,
      props: {
        showWordLimit: false,
      },
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
      props: {
        showWordLimit: false,
      },
    },
    {
      type: 'Input',
      name: 'phone',
      label: '手机号',
      props: {
        showWordLimit: false,
      },
    },
    {
      type: 'Input',
      name: 'address',
      label: '地址',
      props: {
        showWordLimit: false,
      },
    },
  ] as SchemaProps[],
};
