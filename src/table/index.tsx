/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from 'react';
import { PaginationConfig, TableProps } from './type';
import { TableInstance } from './instance.type';
import Table from './table';
import './index.css';

const CoreTable = (props: TableProps) => {
  const {
    emptyNode = '-',
    defaultTools = [
      {
        type: 'FilterColumns',
      },
      {
        type: 'Refresh',
      },
    ] as any,
    locale,
    ...rest
  } = props;
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
      onRefresh: () => {},
      setSelectRow: () => [],
      getSelectRow: () => [],
      setExpandedRowKeys: () => [],
    }).current,
  ];
};

// 分页的默认配置
export const defaultPaginationConfig: PaginationConfig = {
  pageNum: 1,
  pageSize: 10,
  sizeOptions: [10, 20, 50, 100],
  total: 0,
  sizeCanChange: true,
  // hideOnSinglePage: true,
  showJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  activePageItemStyle: {
    backgroundColor: 'var(--color-menu-light-bg)',
  },
};

export default CoreTable;
