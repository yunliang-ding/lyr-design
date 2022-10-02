import { message } from 'antd';
import axios from '../../../axios';
import { TableProps } from 'react-core-form';
import schema from '../form-submit/schema';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));

const tableSchema: TableProps = {
  rowKey: 'id',
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
      list,
    };
  },
  tools: [
    {
      label: '添加1',
      modalFormProps: ({ onSearch }) => {
        return {
          title: '新增用户2',
          schema,
          modalProps: {
            bodyStyle: {
              height: 500,
              overflow: 'auto',
            },
          },
          async onSubmit() {
            await delay(400);
            message.success('保存成功');
            onSearch();
          },
        };
      },
    },
    {
      label: '添加2',
      drawerFormProps: ({ onSearch }) => {
        return {
          title: '新增用户2',
          schema,
          async onSubmit() {
            await delay(400);
            message.success('保存成功');
            onSearch();
          },
        };
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
    width: 200,
    showMore: 2,
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '编辑1',
          modalFormProps: ({ onRefresh }) => {
            return {
              title: '新增用户2',
              initialValues: record,
              schema,
              modalProps: {
                bodyStyle: {
                  height: 500,
                  overflow: 'auto',
                },
              },
              async onSubmit() {
                await delay(400);
                message.success('保存成功');
                onRefresh();
              },
            };
          },
        },
        {
          label: '编辑2',
          drawerFormProps: ({ onRefresh }) => {
            return {
              title: '新增用户2',
              initialValues: record,
              schema,
              async onSubmit() {
                await delay(400);
                message.success('保存成功');
                onRefresh();
              },
            };
          },
        },
      ];
    },
  },
};
export default tableSchema;
