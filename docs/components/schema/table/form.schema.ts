import { SchemaProps } from 'lyr-component';

export default [
  {
    widget: 'Input',
    label: '姓名',
    name: 'username',
  },
  {
    widget: 'Select',
    label: '性别',
    name: 'sex',
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
    label: '城市',
    name: 'city',
  },
  {
    widget: 'Input',
    label: '签名',
    name: 'sign',
  },
  {
    widget: 'Input',
    label: '职业',
    name: 'classify',
  },
  {
    widget: 'Input',
    label: '分数',
    name: 'score',
  },
  {
    widget: 'Input',
    label: '登录次数',
    name: 'logins',
  },
] as SchemaProps[];
