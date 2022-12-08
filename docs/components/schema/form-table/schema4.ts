import { TableProps } from 'react-core-form';

const tableSchema: TableProps = {
  title: '用户列表',
  request: async () => {
    await new Promise((res) => setTimeout(res, 1000));
    return {
      total: 1000,
      success: true,
      list: new Array(1000).fill({
        code: 'code',
        username: 'username',
        sex: 'sex',
        city: 'city',
        sign: 'sign',
        classify: 'classify',
        score: 'score',
        logins: 'logins',
      }),
    };
  },
  tools: [
    {
      label: '添加1',
    },
    {
      label: '添加2',
    },
  ],
  columns: [
    {
      title: '编号',
      dataIndex: 'code',
      width: 100,
      ellipsis: true,
    },
    {
      title: '客户姓名',
      ellipsis: true,
      dataIndex: 'username',
    },
    {
      title: '性别',
      ellipsis: true,
      dataIndex: 'sex',
      enums: ['男', '女'],
    },
    {
      title: '城市',
      ellipsis: true,
      dataIndex: 'city',
    },
    {
      title: '签名',
      ellipsis: true,
      dataIndex: 'sign',
    },
    {
      title: '职业',
      ellipsis: true,
      dataIndex: 'classify',
    },
    {
      title: '分数',
      ellipsis: true,
      dataIndex: 'score',
    },
    {
      title: '登录次数',
      ellipsis: true,
      dataIndex: 'logins',
    },
  ],
};
export default tableSchema;
