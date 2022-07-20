import axios from '../../../axios';
import { TableProps } from 'react-core-form';

const tableSchema: TableProps = {
  rowKey: 'id',
  title: '用户列表',
  scroll: {
    x: 1200,
  },
  request: async (params) => {
    const {
      data: { list, success, total },
    }: any = await axios.get('/api/demo/table/user', {
      params,
    });
    return {
      total,
      success,
      list,
    };
  },
  columns: [
    // 列基本信息
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
    },
    {
      title: '客户姓名',
      dataIndex: 'username',
      width: 150,
      resize: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 150,
      filters: [
        {
          text: '男',
          value: 1,
        },
        {
          text: '女',
          value: 2,
        },
      ],
    },
    {
      title: '城市',
      dataIndex: 'city',
      width: 150,
      resize: true,
    },
    {
      title: '签名',
      dataIndex: 'sign',
      width: 120,
      resize: true,
    },
    {
      title: '职业',
      dataIndex: 'classify',
      width: 120,
      resize: true,
    },
    {
      title: '分数',
      dataIndex: 'score',
      width: 150,
      sorter: true,
    },
    {
      title: '登录次数',
      dataIndex: 'logins',
      width: 170,
      sorter: true,
    },
  ],
  rowOperations: {
    title: '操作',
    ellipsis: true,
    width: 200,
    showMore: 2,
    fixed: 'right',
    menus() {
      return [
        {
          label: '编辑1',
          key: 'f1',
        },
        {
          label: '编辑2',
          key: 'f2',
        },
        {
          label: '编辑3',
          key: 'f3',
        },
      ];
    },
  },
};
export default tableSchema;
