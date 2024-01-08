import { SchemaProps } from 'lyr-design';

const schema: SchemaProps[] = [
  {
    type: 'Select',
    name: 'role',
    label: '用户角色',
    props: {
      options: [
        {
          label: '管理员',
          value: 0,
        },
        {
          label: '开发',
          value: 1,
        },
        {
          label: '测试',
          value: 2,
        },
      ],
    },
  },
  {
    type: 'Select',
    name: 'sex',
    label: '员工性别',
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
    name: 'email',
    label: '电子邮箱',
  },
  {
    type: 'Input',
    name: 'phone',
    label: '手机号码',
    expand: true, // 更多展示
  },
  {
    type: 'Input',
    name: 'weixin',
    label: '微信号码',
    expand: true, // 更多展示
  },
];

export default schema;
