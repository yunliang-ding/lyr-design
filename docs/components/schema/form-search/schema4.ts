import { SchemaProps } from 'lyr-component';

const schema: SchemaProps[] = [
  {
    widget: 'Input',
    name: 'name',
    label: '用户名称',
  },
  {
    widget: 'AsyncSelect',
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
    widget: 'DatePicker',
    name: 'date',
    label: '入职日期',
  },
  {
    widget: 'Input',
    name: 'email',
    label: '电子邮箱',
    expand: true, // 更多展示
  },
  {
    widget: 'Input',
    name: 'phone',
    label: '手机号码',
    expand: true, // 更多展示
  },
];
export default schema;
