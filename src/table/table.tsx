import { useEffect, useState, useRef } from 'react';
import { TableProps } from './type';
import { transformColumns } from './util';
import { Table as ArcoTable, Button, Alert } from '@arco-design/web-react';
import Form from '@/form';
import Search from '@/search';
import Table from './index';
import ToolBar from './toolbar';
import getRowOperations from './row-operations';
import { defaultPaginationConfig } from '.';
import { DraggableRow, DraggableContainer, DragHandle } from './drag-columns';

export default ({
  rowKey = 'id',
  title = '',
  columns = [],
  tools = [],
  defaultTools,
  rowOperations,
  filterIds = [],
  emptyNode,
  onQuery = () => {},
  onLoad = () => {},
  params = {},
  paginationConfig,
  searchSchema,
  alertConfig,
  rowSelection,
  table = Table.useTable()[0],
  tableId,
  drag = false,
  style = {},
  onDragDone = () => {},
  autoNo = false,
  resize = false,
  keepRowSelection = true,
  scrollLoading,
  onReachBottom,
  ...restProp
}: TableProps) => {
  const [payload, setPayload] = useState({}); // 扩展参数
  const [_columns, setColumns] = useState(
    columns.filter((i) => i.visible !== false),
  );
  const [_filterIds, setFilterIds] = useState(filterIds);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading]: any = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  // 分页的配置
  const combPagination = {
    ...defaultPaginationConfig,
    ...(paginationConfig || {}),
  };
  const [pagination, setPagination]: any = useState({
    ...combPagination,
    pageNum: params.pageNum || combPagination.pageNum,
    pageSize: params.pageSize || combPagination.pageSize,
  });
  // 缓存分页序号存储
  const paginationInfo = useRef({
    pageSize: pagination.pageSize,
    pageNum: pagination.pageNum,
  }); // 记录分页的序号
  // 重置分页条件且刷新
  const clearPagination = () => {
    pagination.pageNum = 1; // 页码重制为第一页
    setRefresh(Math.random());
  };
  // 重置
  const onReset = () => {
    clearPagination();
  };
  // 查询
  const onSearch = (p = {}) => {
    setPayload(p);
    clearPagination();
  };
  // 获取当前查询条件
  const getParams = () => {
    return {
      ...form.getFieldsValue(),
      ...payload,
      pageSize: pagination.pageSize,
      pageNum: pagination.pageNum,
      filters: pagination.filters,
      sorter: pagination.sorter,
    };
  };
  /** 查询表格数据 */
  const query = async () => {
    const { filters, sorter, ...rest } = getParams();
    onQuery(rest, filters, sorter); // 通知外面开始查询了
    setLoading(true);
    try {
      const response = await restProp.request(rest, filters, sorter);
      const { success, list, total } = response;
      onLoad(response); // 通知外面请求完毕
      // 如果 list 不是数组，按照报错处理
      if (!success || !Array.isArray(list)) {
        pagination.total = 0; // total重制为0
        setDataSource([]); // 清空数据源
      } else {
        pagination.total = total; // 设置总条数
        pagination.current = pagination.pageNum; // 设置当前页码
        // 查询成功之后设置
        paginationInfo.current.pageSize = pagination.pageSize;
        paginationInfo.current.pageNum = pagination.pageNum;
        setDataSource(list); // 设置数据源
      }
    } catch (error) {
      console.error('Request Error ->', error);
    } finally {
      setLoading(false); // 查询完毕
    }
  };
  // 刷新数据
  useEffect(() => {
    query();
  }, [refresh, pagination]);
  /** rowOperations */
  const rowOperationsColumns = getRowOperations({
    rowOperations,
    tableInstance: table,
  });
  const lastColumns = rowOperationsColumns
    ? [..._columns, rowOperationsColumns]
    : _columns;
  // 拖拽调整表格的宽度
  const onCellWidthChange = (column: any, width: number) => {
    const c = _columns.find((i) => i.dataIndex === column.dataIndex);
    if (c) {
      c.width = width;
      setColumns([..._columns]);
    }
  };
  /**
   * 支持多选，内部维护一份数据状态
   */
  const [innerSelectedRow, setInnerSelectedRow] = useState(
    rowSelection?.defaultSelectedRows || [],
  );
  const [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState([]);
  /** 同步 innerSelectedRowKeys */
  useEffect(() => {
    const _innerSelectedRowKeys = innerSelectedRow.map(
      (row) => row[rowKey as string],
    );
    setInnerSelectedRowKeys(_innerSelectedRowKeys);
    rowSelection?.onChange?.(_innerSelectedRowKeys, innerSelectedRow);
  }, [innerSelectedRow]);
  /** 真正传递给Table的 */
  let innerRowSelection = rowSelection;
  if (
    keepRowSelection &&
    typeof rowSelection === 'object' &&
    rowSelection.type !== 'radio' // 单选不处理
  ) {
    innerRowSelection = {
      ...rowSelection,
      onChange: () => {}, // 已在 154 通知
      selectedRowKeys: innerSelectedRowKeys,
      onSelectAll: (selected, currentSelectedRows) => {
        currentSelectedRows = currentSelectedRows.filter(
          (item) => item !== undefined,
        );
        let _selectedRows = [...innerSelectedRow];
        if (selected) {
          // 合并之前选择的
          currentSelectedRows.forEach((item) => {
            if (!_selectedRows.some((_item: any) => _item.id === item.id)) {
              _selectedRows.push(item);
            }
          });
        } else {
          _selectedRows = _selectedRows.filter((i: any) => {
            return currentSelectedRows.some((item) => item.id === i.id);
          });
        }
        setInnerSelectedRow([..._selectedRows]);
      },
      onSelect: (selected, record) => {
        let currentSelectedRows = [...innerSelectedRow];
        if (selected) {
          // 添加这个ID
          currentSelectedRows.push(record);
        } else {
          // 删除这个
          currentSelectedRows = currentSelectedRows.filter(
            (i) => i[rowKey as string] !== record[rowKey as string],
          );
        }
        setInnerSelectedRow(currentSelectedRows); // 更新
      },
    };
  }
  // 提示信息
  const alertProps =
    typeof alertConfig === 'function'
      ? alertConfig(innerSelectedRowKeys, innerSelectedRow, setInnerSelectedRow)
      : alertConfig;
  // 调整表格尺寸
  const [size, setSize]: any = useState(restProp.size || 'default');
  const onSizeChange = (s) => {
    setSize(s);
  };
  // 展开的逻辑
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  /** 实例扩展方法 */
  useEffect(() => {
    Object.assign(table, {
      getDataSource: () => dataSource,
      getParams,
      onSearch,
      onReset,
      onRefresh: query,
      setSelectRow: setInnerSelectedRowKeys,
      setExpandedRowKeys,
      getSelectRow: () => {
        return innerSelectedRow;
      },
    });
  }, [dataSource, innerSelectedRow, expandedRowKeys]);
  // 扩展 columns
  let newColumns = lastColumns.filter(
    (item: any) => !_filterIds.includes(item.dataIndex),
  );
  // 自增序号
  if (autoNo) {
    newColumns = [
      {
        title: '序号',
        columnType: 'columnNo',
      },
      ...newColumns,
    ];
  }
  newColumns = transformColumns(
    newColumns,
    emptyNode,
    onCellWidthChange,
    paginationInfo.current,
    resize,
  );
  // 查询条件区域
  const searchDom = searchSchema && (
    <Search
      {...searchSchema}
      /** 覆盖的配置 */
      initialValues={params}
      onReset={onReset}
      onSearch={onSearch}
      searchBtnRender={() => (
        <Button
          key="search"
          type="primary"
          loading={loading}
          onClick={() => {
            onSearch({});
          }}
        >
          查询
        </Button>
      )}
      form={form}
    />
  );
  // 操作栏和提示区域
  const toolBarAlertDom = (
    <>
      <ToolBar
        title={title}
        size={size}
        onSizeChange={onSizeChange}
        params={getParams()}
        setColumns={setColumns}
        columns={_columns}
        tools={[
          ...tools.filter((i) => {
            try {
              return typeof i.visible === 'function'
                ? i.visible() !== false
                : i.visible !== false;
            } catch (error) {
              console.log(error);
              return false;
            }
          }),
          ...defaultTools,
        ]} // 提前过滤
        onRefresh={query}
        onSearch={onSearch}
        filterIds={_filterIds}
        onFilter={setFilterIds}
        tableId={tableId}
        tableInstance={table}
      />
      {alertConfig && alertProps.visible !== false && (
        <Alert {...alertProps} style={{ marginBottom: 16, paddingLeft: 12 }} />
      )}
    </>
  );
  /** 主体渲染Dom */
  const tableDom = (
    <ArcoTable
      rowKey={rowKey}
      loading={loading}
      className="arco-drag-table-container-2"
      data={dataSource}
      columns={newColumns}
      expandedRowKeys={expandedRowKeys}
      onExpandedRowsChange={(expandedKeys) => {
        setExpandedRowKeys([...expandedKeys]);
      }}
      onChange={(_pagination, filters, sorter) => {
        if (typeof pagination.onChange === 'function') {
          pagination.onChange(_pagination, filters, sorter);
        }
        setPagination({
          ...pagination,
          pageSize: _pagination.pageSize,
          pageNum: _pagination.current,
          filters,
          sorter,
        });
      }}
      rowSelection={innerRowSelection}
      components={
        drag
          ? {
              header: {
                operations: () => [
                  {
                    node: <th />,
                    width: 40,
                  },
                ],
              },
              body: {
                operations: () => [
                  {
                    node: (
                      <td>
                        <div className="arco-table-cell">
                          <DragHandle />
                        </div>
                      </td>
                    ),
                    width: 40,
                  },
                ],
                tbody: (props) => <DraggableContainer {...props} />,
                row: (props) => {
                  return (
                    <DraggableRow
                      dataSource={dataSource}
                      setDataSource={setDataSource}
                      onDragDone={onDragDone}
                      {...props}
                    />
                  );
                },
              },
            }
          : undefined
      }
      {...restProp}
      pagination={
        restProp.pagination === false || restProp.virtualized
          ? false
          : {
              size,
              ...pagination,
              onChange: () => {}, // 取消这里的onChange，使用Table的onChange
            }
      }
    />
  );
  return (
    <>
      {searchDom}
      <div
        className={
          dataSource.length === 0
            ? 'core-form-table-empty core-form-table core-form-table'
            : 'core-form-table core-form-table'
        }
        style={style}
      >
        {toolBarAlertDom}
        {tableDom}
      </div>
    </>
  );
};
