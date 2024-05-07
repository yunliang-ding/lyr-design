import { Message } from '@arco-design/web-react';
import axios from '../../../axios';
import { TableProps } from 'lyr-component';
import schema from './form.schema';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms, true));

const user1Form = ({ onSearch, initialValues = { id: undefined } }) => {
  return {
    title: initialValues.id ? '编辑1' : '添加1',
    schema,
    initialValues,
    bodyStyle: {
      height: 500,
      overflow: 'auto',
    },
    async onSubmit() {
      await delay(400);
      Message.success('保存成功');
      onSearch?.();
    },
  };
};

const user2Form = ({ onSearch, initialValues = { id: undefined } }) => {
  return {
    title: initialValues.id ? '编辑2' : '添加2',
    schema,
    initialValues,
    async onSubmit() {
      await delay(400);
      Message.success('保存成功');
      onSearch?.();
    },
  };
};

const tableSchema: TableProps = {
  rowKey: 'id',
  title: '用户列表',
  scroll: {
    x: 1200,
  },
  request: async (params) => {
    const {
      data: { list, success, total },
    }: any = await axios.get('/lyr-component/table', {
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
      modalFormProps: ({ onSearch }) => {
        return user1Form({ onSearch });
      },
    },
    {
      label: '添加2',
      drawerFormProps: ({ onSearch }) => {
        return user2Form({ onSearch });
      },
    },
  ],
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
    width: 200,
    showMore: 2,
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '编辑1',
          modalFormProps: ({ onRefresh }) => {
            return user1Form({ onSearch: onRefresh, initialValues: record });
          },
        },
        {
          label: '编辑2',
          drawerFormProps: ({ onRefresh }) => {
            return user2Form({ onSearch: onRefresh, initialValues: record });
          },
        },
        {
          label: '删除',
          confirm: {
            content: '是否确定删除',
          },
          onClick: async ({ onSearch }) => {
            await new Promise((res) => setTimeout(res, 1000));
            Message.success('已删除');
            onSearch(); // 刷新
          },
        },
      ];
    },
  },
};
export default tableSchema;
