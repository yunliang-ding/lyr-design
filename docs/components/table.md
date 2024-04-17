---
order: 6
title: Table 数据表格
toc: menu
---

<!--
## 使用 数据模型渲染

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema';

export default () => {
  return <Table {...tableSchema} />;
};
```

## 使用 ellipsis 扩展、useThousandth 千分位、emptyNode 展示空数据

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema1';

export default () => {
  return <Table {...tableSchema} />;
};
```

## 使用 enums 配置 列枚举映射关系

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';

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
          enums: ['男', '女'], // 基本数组类型
          // render(userSex) {
          //   return ['男', '女'][userSex];
          // },
        },
        {
          title: '用户状态',
          dataIndex: 'userState',
          enums: userStateMapping, // 对象映射
          // render(userState) {
          //   return userStateMapping[userState];
          // },
        },
        {
          title: '用户类型',
          dataIndex: 'userType',
          enumsConf: {
            isArrObj: true,
          },
          enums: userTypeList, // List数组对象
          // render(userSex) {
          //   return userTypeList.find((i) => i.value === userSex)?.label;
          // },
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

## 使用 resize 属性 开启拖拽调整宽度

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema';

export default () => {
  return <Table {...tableSchema} resize borderCell />;
};
```

## 开启 autoNo 分页序号

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import schema from './schema/form-table/schema';

export default () => {
  return <Table autoNo {...schema} />;
};
``` -->

## 配置 drag 属性，支持可拖动

```tsx
/**
 * background: '#f6f7f9'
 * title: 约定数据源选项包含 index 属性，做为唯一序号
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema';

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

<!--
## 使用 alertConfig 配置提示信息

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table, Button } from 'lyr-design';
import tableSchema from './schema/form-table/schema';
import { Space } from '@arco-design/web-react';

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
        // 设置默认值
        // defaultSelectedRows: [],
        // type: 'radio',
        onChange: (keys, rows) => {
          console.log(keys, rows);
        },
      }}
      alertConfig={(selectedRowKeys, selectedRows, setSelectedRows) => {
        return {
          visible: selectedRowKeys.length > 0, // 控制展示
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

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema';

export default () => {
  return <Table {...tableSchema} filterIds={['sex', 'city', 'sign']} />;
};
```

## 使用自定义 tools

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import { Input } from '@arco-design/web-react';
import tableSchema from './schema/form-table/schema';

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

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema';

export default () => {
  return (
    <Table
      {...tableSchema}
      paginationConfig={{
        sizeCanChange: true,
        showTotal: (total: number) => `总计 ${total} 条数据`,
      }}
    />
  );
};
```

## 使用 searchSchema 配置查询表单

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import searchSchema from './schema/form-table/search.schema';
import tableSchema from './schema/form-table/schema';

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

```tsx
/**
 * background: '#f6f7f9'
 * title: 说明
 * description: 需要清空缓存可以在组件卸载的钩子去决定是否需要清空。
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema';
import searchSchema from './schema/form-table/search.schema';

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

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import searchSchema from './schema/form-table/search.schema';
import tableSchema from './schema/form-table/schema3';

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

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'lyr-design';
import tableSchema from './schema/form-table/schema4';
import { Spin } from '@arco-design/web-react';

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
  const loadMoreData = async (pageNum: number) => {
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

## Table 扩展属性

<API src="../../src/table/index.tsx" hideTitle></API>

## Table Instance

<API src="../../src/table/table.instance.tsx" hideTitle></API>

## Column 扩展属性

<API src="../../src/table/type.column.tsx" hideTitle></API> -->
