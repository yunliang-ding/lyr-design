import { SchemaProps } from 'lyr-component';

const schema: SchemaProps[] = [
  {
    widget: 'Select',
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
    widget: 'Select',
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
    widget: 'Input',
    name: 'email',
    label: '电子邮箱',
  },
  {
    widget: 'Input',
    name: 'phone',
    label: '手机号码',
    expand: true, // 更多展示
  },
  {
    widget: 'Input',
    name: 'weixin',
    label: '微信号码',
    expand: true, // 更多展示
  },
];

export default schema;
