import { SchemaProps } from 'react-core-form';

export default [
  {
    type: 'Input',
    label: '姓名',
    name: 'username',
  },
  {
    type: 'Select',
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
    type: 'Input',
    label: '城市',
    name: 'city',
  },
  {
    type: 'Input',
    label: '签名',
    name: 'sign',
  },
  {
    type: 'Input',
    label: '职业',
    name: 'classify',
  },
  {
    type: 'Input',
    label: '分数',
    name: 'score',
  },
  {
    type: 'Input',
    label: '登录次数',
    name: 'logins',
  },
] as SchemaProps[];
