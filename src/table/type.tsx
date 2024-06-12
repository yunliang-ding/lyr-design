/* eslint-disable import/no-cycle */
import { SearchProps } from '../search/type';
import {
  AlertProps,
  TableProps as ArcoTableProps,
  PaginationProps,
} from '@arco-design/web-react';
import {
  ColumnProps,
  RowSelectionProps,
} from '@arco-design/web-react/es/Table';
import { CSSProperties, ReactNode } from 'react';
import { TableColumnType } from './column.type';
import { TableInstance } from './instance.type';
import { ToolsProps } from './tools.type';

export interface PaginationConfig extends PaginationProps {
  /**
   * 当前页码
   * @default 1
   */
  pageNum: number;
}


export interface RowOperationsTypes extends ColumnProps<any> {
  /** 是否展示 */
  visible?: boolean;
  /** 展示更多 */
  showMore?: number;
  /** 配置按钮 */
  menus: (record) => ToolsProps[];
}

interface TableAlertProps extends AlertProps {
  visible?: boolean;
}

export interface TableRowSelectionProps extends RowSelectionProps<any> {
  defaultSelectedRows?: [];
}

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

export default (props: TableProps) => null;