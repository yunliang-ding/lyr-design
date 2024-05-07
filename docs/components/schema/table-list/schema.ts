import { SchemaProps } from 'lyr-component';

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
      widget: 'Input',
      name: 'name',
      label: '姓名',
      required: true,
      props: {
        showWordLimit: false,
      },
    },
    {
      widget: 'Select',
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
      widget: 'Input',
      name: 'age',
      label: '年纪',
      effect: ['sex'],
      isVisible: ({ sex }) => sex === 0,
      props: {
        showWordLimit: false,
      },
    },
    {
      widget: 'Input',
      name: 'phone',
      label: '手机号',
      props: {
        showWordLimit: false,
      },
    },
    {
      widget: 'Input',
      name: 'address',
      label: '地址',
      props: {
        showWordLimit: false,
      },
    },
  ] as SchemaProps[],
};
