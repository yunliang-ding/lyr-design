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
  tools: [
    {
      label: '添加1',
    },
    {
      label: '添加2',
    },
    {
      label: '添加3',
    },
    {
      label: '导出数据',
      spin: true,
    },
    {
      type: 'Dropdown',
      label: '更多操作',
      menu: [
        {
          label: '更多操作1',
        },
        {
          type: 'Divider',
        },
        {
          label: '更多操作2',
        },
        {
          label: '更多操作3',
        },
      ],
    },
  ],
  columns: [
    // 列基本信息
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '客户姓名',
      ellipsis: true,
      dataIndex: 'username',
      width: 150,
    },
    {
      title: '性别',
      ellipsis: true,
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
      ellipsis: true,
      dataIndex: 'city',
      width: 150,
    },
    {
      title: '签名',
      ellipsis: true,
      dataIndex: 'sign',
      width: 120,
    },
    {
      title: '职业',
      ellipsis: true,
      dataIndex: 'classify',
      width: 120,
    },
    {
      title: '分数',
      ellipsis: true,
      dataIndex: 'score',
      width: 150,
      sorter: true,
    },
    {
      title: '登录次数',
      ellipsis: true,
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
    menus(record) {
      return [
        {
          label: '编辑1',
          disabled: record.id === 1,
          visible: () => {
            return record.id !== 2;
          },
        },
        {
          label: '编辑2',
        },
        {
          label: '编辑3',
          visible: record.id !== 1,
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
  onQuery: (params) => {
    console.log('onQuery ->', params);
  },
  onLoad: (res) => {
    console.log('onLoad ->', res);
  },
};

export default tableSchema;
