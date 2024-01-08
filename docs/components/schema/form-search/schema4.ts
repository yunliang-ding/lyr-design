import { SchemaProps } from 'lyr-design';

const schema: SchemaProps[] = [
  {
    type: 'Input',
    name: 'name',
    label: '用户名称',
  },
  {
    type: 'AsyncSelect',
    name: 'sex',
    label: '员工性别',
    props: {
      options: async () => {
        await new Promise((res) => setTimeout(res, 500));
        return [
          {
            label: '男',
            value: 0,
          },
          {
            label: '女',
            value: 1,
          },
        ];
      },
    },
  },
  {
    type: 'DatePicker',
    name: 'date',
    label: '入职日期',
  },
  {
    type: 'Input',
    name: 'email',
    label: '电子邮箱',
    expand: true, // 更多展示
  },
  {
    type: 'Input',
    name: 'phone',
    label: '手机号码',
    expand: true, // 更多展示
  },
];
export default schema;
