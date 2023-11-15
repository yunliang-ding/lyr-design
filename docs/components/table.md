---
order: 6
title: Table 数据表格
toc: menu
---

## 使用 数据模型渲染

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema';

export default () => {
  return <Table {...tableSchema} />;
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
import { Table } from 'react-core-form';
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

## 使用 ellipsis 扩展、useThousandth 千分位、emptyNode 展示空数据

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema1';

export default () => {
  return <Table {...tableSchema} />;
};
```

## 配置 drag 属性，支持可拖动

```tsx
/**
 * background: '#f6f7f9'
 * title: 约定数据源选项包含 index 属性，做为唯一序号
 */
import React from 'react';
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema1';

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

## 使用 enums 配置 列枚举映射关系

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'react-core-form';

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
import { Table } from 'react-core-form';
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
import { Table } from 'react-core-form';
import schema from './schema/form-table/schema';

export default () => {
  return <Table autoNo {...schema} />;
};
```

## 使用 alertConfig 配置提示信息

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table, Button } from 'react-core-form';
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

<!--
## 使用 filterIds 配置不展示字段

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema1';

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
import { Table } from 'react-core-form';
import { Input } from '@arco-design/web-react';
import tableSchema from './schema/form-table/schema1';

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
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema';

export default () => {
  return (
    <Table
      {...tableSchema}
      paginationConfig={{
        pageSize: 5,
        size: 'small',
        pageSizeOptions: [5, 10, 20],
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
import { Table } from 'react-core-form';
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

## 配置化 CRUD

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'react-core-form';
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

## 使用 tableRender 自定义渲染

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema';
import { Space, Descriptions, Card, Menu } from '@arco-design/web-react';

export default () => {
  const [key, setKey] = React.useState('1');
  const [table] = Table.useTable();
  return (
    <Table
      {...tableSchema}
      table={table}
      tableRender={(dom, dataSource) => {
        return (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="Row">
                  {dataSource.length}
                </Descriptions.Item>
                <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                <Descriptions.Item label="Association">
                  <a>421421</a>
                </Descriptions.Item>
                <Descriptions.Item label="Creation Time">
                  2017-01-10
                </Descriptions.Item>
                <Descriptions.Item label="Effective Time">
                  2017-10-10
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: 256,
                  border: '1px solid #f0f0f0',
                }}
              >
                <Menu
                  onSelect={(e) => setKey(e.key as string)}
                  onClick={(e) => {
                    table.onSearch({
                      menuKey: e.key,
                    });
                  }}
                  style={{ width: 256 }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                >
                  <Menu.SubMenu
                    key="sub1"
                    title={
                      <span>
                        <span>Navigation One</span>
                      </span>
                    }
                  >
                    <Menu.ItemGroup key="g1" title="Item 1">
                      <Menu.Item key="1">Option 1</Menu.Item>
                      <Menu.Item key="2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="Item 2">
                      <Menu.Item key="3">Option 3</Menu.Item>
                      <Menu.Item key="4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.SubMenu>
                </Menu>
              </div>
              <div
                style={{
                  width: 'calc(100% - 266px)',
                }}
              >
                {dom}
              </div>
            </div>
          </Space>
        );
      }}
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
import { Table } from 'react-core-form';
import tableSchema from './schema/form-table/schema4';

export default () => {
  const loadMoreData = async (data) => {
    if (data.length === 60) {
      return false;
    }
    await new Promise((res) => setTimeout(res, 1000));
    return new Array(20).fill({
      code: 'code',
      username: 'username',
      sex: 'sex',
      city: 'city',
      sign: 'sign',
      classify: 'classify',
      score: 'score',
      logins: 'logins',
    });
  };
  return (
    <Table
      {...tableSchema}
      virtual
      scroll={{
        y: 400,
      }}
      loadMoreData={loadMoreData}
      request={async (params) => {
        await new Promise((res) => setTimeout(res, 1000));
        return {
          total: 20,
          success: true,
          list: new Array(20).fill({
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
      }}
    />
  );
};
``` -->

## Table 扩展属性

<API src="../../src/table/index.tsx" hideTitle></API>

## Table Instance

<API src="../../src/table/table.instance.tsx" hideTitle></API>

## Column 扩展属性

<API src="../../src/table/type.column.tsx" hideTitle></API>

## PaginationConfig

<API src="../../src/table/type.pagination.tsx" hideTitle></API>
