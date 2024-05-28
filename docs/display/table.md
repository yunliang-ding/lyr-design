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

```tsx | react | var(--color-fill-2)
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

```tsx | react | var(--color-fill-2)
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

```tsx | react | var(--color-fill-2)
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


## API

```ts
export interface TableProps extends Omit<ArcoTableProps, 'title' | 'columns'> {
  /** 表格标题 */
  title?: ReactNode;
  columns: TableColumnType[];
  /** 统一处理请求逻辑 */
  request: (
    params?,
    filter?,
    sorter?,
  ) => Promise<{
    success: boolean;
    list: any[];
    total: number;
  }>;
  /** 工具栏配置 */
  tools?: ToolsProps[];
  /**
   * 默认工具栏配置
   * @default [
    {
      type: 'FilterColumns'
    },
    {
      type: 'Refresh'
    },
  ]
   */
  defaultTools?: ToolsProps[];
  /** 操作列配置 */
  rowOperations?: RowOperationsTypes;
  /** 过滤的字段 */
  filterIds?: string[];
  /** 列为空展示的文案 */
  emptyNode?: ReactNode | string;
  /** 准备查询3个参数分别为、查询条件、过滤条件、排序条件 */
  onQuery?: (params?, filter?, sorter?) => void;
  /** 加载完毕回调 */
  onLoad?: (response: any) => void;
  /** 默认查询值 */
  params?: any;
  /** 分页配置 */
  paginationConfig?: PaginationConfig;
  /** 查询框配置 */
  searchSchema?: SearchProps;
  /** 国际化 */
  locale?: any;
  /** 提示信息 */
  alertConfig?:
    | TableAlertProps
    | ((selectedRowKeys, selectedRows, setSelectedRowKeys) => TableAlertProps);
  /** Table api 的引用，便于自定义触发 */
  table?: TableInstance;
  /** 唯一标识 */
  tableId?: string;
  /** 是否开启拖拽 */
  drag?: boolean;
  /** 是否开启调整宽度 */
  resize?: boolean;
  /** 拖拽结束的钩子 */
  onDragDone?: (data) => any;
  /** 开启自增序号 */
  autoNo?: boolean;
  /** 主容器样式 */
  style?: CSSProperties;
  /**
   * 多选保留选择历史
   * @default true
   */
  keepRowSelection?: boolean;
  rowSelection?: TableRowSelectionProps;
  /** 下滑加载数据提示 */
  scrollLoading?: ReactNode;
  /** 下滑加载数据 */
  onReachBottom?: Function;
}

```


## TableColumnType

```ts
import { TooltipProps, TableColumnProps } from '@arco-design/web-react';

export interface TableColumnType extends TableColumnProps<any> {
  /** 千分位展示金额 */
  useThousandth?:
    | {
        minimumFractionDigits: number;
        maximumFractionDigits: number;
      }
    | boolean;
  /** 支持复制 */
  copyable?:
    | boolean
    | {
        text: string | ((v, record, index) => string);
      };
  /** 提示 */
  tip?: React.ReactNode;
  /** 是否展示 */
  visible?: boolean;
  /** 链接标识 */
  link?: boolean;
  /** 是否可拖拽改宽度 */
  resize?: boolean;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 枚举：支持对象 ｜ 数组  */
  enums?: any[] | AnyObjet;
  /** 枚举 配置 */
  enumsConf?: {
    /** 是否是数组对象 */
    isArrObj?: boolean;
    /** 标识字段 */
    key: string;
    /** 展示字段 */
    label: string;
  };
  /** 字段类型 */
  columnType?: 'columnNo';
  /** 日期格式化 */
  dateFormat?: string;
  /** tooltipProps */
  tooltipProps?: TooltipProps;
}
```