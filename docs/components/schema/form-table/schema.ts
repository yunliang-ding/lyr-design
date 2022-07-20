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
      key: 'f1',
    },
    {
      label: '添加2',
      key: 'f2',
    },
    {
      label: '添加3',
      key: 'f3',
    },
    {
      label: '导出数据',
      key: 'export',
      spin: true,
    },
    {
      type: 'Dropdown',
      label: '更多操作',
      menu: [
        {
          key: 'action_1',
          label: '更多操作1',
        },
        {
          type: 'Divider',
          key: 'split',
        },
        {
          key: 'action_2',
          label: '更多操作2',
        },
        {
          key: 'action_3',
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
          key: 'f1',
          disabled: record.id === 1,
        },
        {
          label: '编辑2',
          key: 'f2',
        },
        {
          label: '编辑3',
          key: 'f3',
          visible: record.id !== 1,
        },
        {
          label: '删除',
          key: 'delete',
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
  toolsClick: async (tool) => {
    if (tool.key === 'export') {
      await new Promise((res) => setTimeout(res, 2000));
    }
    console.log('toolsClick ->', tool);
  },
  rowOperationsClick: (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  },
};

export default tableSchema;
