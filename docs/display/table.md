## 数据模型渲染

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return <Table {...tableSchema} />;
};
```

## 使用 ellipsis 扩展、useThousandth 千分位、emptyNode 展示空数据

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema1.ts';

export default () => {
  return <Table {...tableSchema} />;
};
```

## enums 配置 列枚举映射关系

```tsx | react
import { Table } from 'lyr-component';

const userStateMapping = {
  disabled: '已停用',
  enabled: '启用',
  initial: '初始化',
};

const userTypeList = [
  {
    value: 'admin',
    label: '管理员',
  },
  {
    value: 'ui-design',
    label: '设计师',
  },
  {
    value: 'pm',
    label: '产品经理',
  },
];
export default () => {
  return (
    <Table
      title={'用户列表'}
      rowKey="userName"
      columns={[
        {
          title: '用户姓名',
          dataIndex: 'userName',
        },
        {
          title: '用户日期',
          dataIndex: 'userDate',
          dateFormat: 'YYYY-MM-DD',
        },
        {
          title: '用户性别',
          dataIndex: 'userSex',
          enums: ['男', '女'],
        },
        {
          title: '用户状态',
          dataIndex: 'userState',
          enums: userStateMapping,
        },
        {
          title: '用户类型',
          dataIndex: 'userType',
          enumsConf: {
            isArrObj: true,
          },
          enums: userTypeList,
        },
      ]}
      request={() => {
        return {
          total: 1,
          list: [
            {
              userName: '测试',
              userSex: 0,
              userState: 'initial',
              userType: 'admin',
              userDate: new Date().getTime(),
            },
          ],
          success: true,
        };
      }}
    />
  );
};
```

## resize 属性 开启拖拽调整宽度

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return <Table {...tableSchema} resize borderCell />;
};
```

## 开启 autoNo 分页序号

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return <Table autoNo {...tableSchema} />;
};
```

## 配置 drag 属性，支持可拖动

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return (
    <Table
      {...tableSchema}
      drag
      onDragDone={(result) => {
        console.log('onDragDone: ', result);
      }}
    />
  );
};
```

## 使用 alertConfig 配置提示信息

```tsx | react
import { Table, Button } from 'lyr-component';
import { Space } from '@arco-design/web-react';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return (
    <Table
      {...tableSchema}
      tools={[
        {
          label: '批量修改',
          key: 'setting',
          onClick: ({ getSelectRow, getDataSource }) => {
            console.log('getSelectRow', getSelectRow());
            console.log('getDataSource', getDataSource());
          },
        },
      ]}
      rowSelection={{
        onChange: (keys, rows) => {
          console.log(keys, rows);
        },
      }}
      alertConfig={(selectedRowKeys, selectedRows, setSelectedRows) => {
        return {
          visible: selectedRowKeys.length > 0,
          content: (
            <Space size={24}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <span>{`分数总计: ${selectedRows.reduce(
                (pre, item) => pre + item.score,
                0,
              )} 分`}</span>
              <span>{`登录次数总计: ${selectedRows.reduce(
                (pre, item) => pre + item.logins,
                0,
              )} 次`}</span>
            </Space>
          ),
          type: 'info',
          showIcon: true,
          action: (
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setSelectedRows([]);
              }}
            >
              取消选择
            </Button>
          ),
        };
      }}
    />
  );
};
```

## 使用 filterIds 配置不展示字段

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return <Table {...tableSchema} filterIds={['sex', 'city', 'sign']} />;
};
```

## 使用自定义 tools

```tsx | react
import { Table } from 'lyr-component';
import { Input } from '@arco-design/web-react';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return (
    <Table
      {...tableSchema}
      tools={[
        {
          type: 'Render',
          render({ onSearch }) {
            return (
              <Input.Search
                placeholder="请输入关键字查询"
                onSearch={(keywords) => {
                  onSearch({
                    keywords: keywords || undefined,
                  });
                }}
                enterButton
                allowClear
              />
            );
          },
        },
      ]}
    />
  );
};
```

## 使用 paginationConfig 分页配置

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';

export default () => {
  return (
    <Table
      {...tableSchema}
      paginationConfig={{
        sizeCanChange: true,
        showTotal: (total) => `总计 ${total} 条数据`,
      }}
    />
  );
};
```

## 使用 searchSchema 配置查询表单

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';
import searchSchema from '@/components/schema/table/search.schema.ts';

export default () => {
  return (
    <Table
      params={{
        level: 1,
      }}
      {...tableSchema}
      searchSchema={searchSchema}
    />
  );
};
```

## 缓存查询条件

> 需要清空缓存可以在组件卸载的钩子去决定是否需要清空

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';
import searchSchema from '@/components/schema/table/search.schema.ts';

export default () => {
  return (
    <Table
      {...tableSchema}
      searchSchema={searchSchema}
      params={window.cacheParams}
      onQuery={(params) => {
        window.cacheParams = params;
      }}
    />
  );
};
```

## 配置化 CRUD

```tsx | react
import { Table } from 'lyr-component';
import tableSchema from '@/components/schema/table/schema.ts';
import searchSchema from '@/components/schema/table/search.schema.ts';

export default () => {
  return (
    <Table
      params={{
        level: 1,
      }}
      {...tableSchema}
      searchSchema={searchSchema}
    />
  );
};
```

## 下滑加载数据

```tsx | react
import { Table } from 'lyr-component';
import { Spin } from '@arco-design/web-react';
import tableSchema from '@/components/schema/table/schema4.ts';

const mockData = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  return {
    total: 20,
    success: true,
    list: new Array(30).fill({
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
};

export default () => {
  const [scrollLoading, setScrollLoading] = React.useState(
    <Spin loading={true} />,
  );
  const loadMoreData = async (pageNum) => {
    if (pageNum === 4) {
      return setScrollLoading('No more data');
    }
    return mockData();
  };
  return (
    <Table
      {...tableSchema}
      pagination={false}
      autoNo
      scroll={{
        y: 400,
      }}
      scrollLoading={scrollLoading}
      onReachBottom={loadMoreData}
      request={mockData}
    />
  );
};
```
