import axios from '../../../axios';
import { TableProps } from 'react-core-form';

const tableSchema: TableProps = {
  rowKey: 'id',
  emptyNode: '--',
  title: '用户列表',
  scroll: {
    x: 1200,
  },
  request: async (params) => {
    const {
      data: { list, success, total },
    }: any = await axios.get('/react-core-form/table', {
      params,
    });
    return {
      total,
      success,
      list: list.map((item) => {
        return {
          ...item,
          city: '这个签名是一段很长的详细地址信息这个签名是一段很长的详细地址信息这个签名是一段很长的详细地址信息',
          sign: '这个签名是一段很长的描述信息这个签名是一段很长的描述信息这个签名是一段很长的描述信息这个签名是一段很长的描述信息',
          logins: 12345678,
          score: undefined,
        };
      }),
    };
  },
  columns: [
    // 列基本信息
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
      link: true,
      copyable: {
        text: (v, record, index) => {
          return JSON.stringify(record);
        },
      },
    },
    {
      title: '客户姓名',
      dataIndex: 'username',
      tip: '这里是客户姓名描述',
      copyable: true,
      ellipsis: true,
      width: 150,
      onCell: () => {
        return {
          onClick() {
            console.log('点击复制不会执行');
          },
        };
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 150,
      enums: ['男', '女'],
      filters: [
        {
          text: '男',
          value: 0,
        },
        {
          text: '女',
          value: 1,
        },
      ],
    },
    {
      title: '城市',
      dataIndex: 'city',
      width: 150,
      ellipsis: true,
    },
    {
      title: '签名',
      dataIndex: 'sign',
      width: 120,
      ellipsis: true,
    },
    {
      title: '职业',
      dataIndex: 'classify',
      width: 120,
    },
    {
      title: '分数',
      dataIndex: 'score',
      width: 150,
    },
    {
      title: '登录次数',
      dataIndex: 'logins',
      width: 170,
      useThousandth: true,
      copyable: true,
    },
  ],
  rowOperations: {
    title: '操作',
    width: 260,
    showMore: 2,
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '复制链接',
          copyable: {
            text: '复制了拷贝内容',
          },
        },
        {
          label: '编辑1',
        },
        {
          label: '编辑2',
        },
        {
          label: '编辑3',
        },
        {
          label: '删除',
          confirm: {
            title: '提示',
            content: `确认删除ID为${record.id}的记录吗？`,
          },
        },
      ];
    },
  },
};
export default tableSchema;
