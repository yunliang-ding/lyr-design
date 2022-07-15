/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from 'react';
import { TableProps } from './types';
import { PaginationConfig } from './type.pagination';
import { TableInstance } from './table.instance';
import zhCN from 'antd/lib/locale/zh_CN';
import Table from './table';

/** 本地缓存 */
export const updateLocalFilter = (tableId, columns?, filterIds?, pageSize?) => {
  if (tableId) {
    const localData = JSON.parse(localStorage.getItem(`table_${tableId}`));
    if (localData) {
      columns =
        columns ||
        localData.columnIds.map((dataIndex) => {
          return { dataIndex };
        });
      filterIds = filterIds || localData.filterIds;
      pageSize = pageSize || localData.pageSize;
    }
    localStorage.setItem(
      `table_${tableId}`,
      JSON.stringify({
        columnIds: columns.map((i) => i.dataIndex || i.key),
        filterIds,
        pageSize,
      }),
    );
  }
};

// 分页的默认配置
export const defaultPaginationConfig: PaginationConfig = {
  pageNum: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
};

const CoreTable = ({
  emptyNode = '-',
  defaultTools = [
    {
      type: 'Refresh',
    },
    {
      type: 'AdjustSize',
    },
    {
      type: 'FilterColumns',
    },
  ],
  locale = zhCN,
  ...rest
}: TableProps) => {
  return (
    <Table
      emptyNode={emptyNode}
      locale={locale}
      defaultTools={defaultTools}
      {...rest}
    />
  );
};

CoreTable.useTable = () => {
  return [
    useRef<TableInstance>({
      getDataSource: () => [],
      getParams: () => {},
      onSearch: (payload?) => {},
      onReset: () => {},
      query: () => {},
    }).current,
  ];
};

export default CoreTable;
