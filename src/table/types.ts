/* eslint-disable import/no-cycle */
import { SearchProps } from '../search/types';
import {
  AlertProps,
  TableProps as ArcoTableProps,
  TooltipProps,
} from '@arco-design/web-react';
import { CSSProperties, ReactNode } from 'react';
import { TableColumnType } from './type.column';
import { TableInstance } from './table.instance';
import { PaginationConfig } from './type.pagination';
import { ModalFormProps, DrawerFormProps } from '..';
import {
  ColumnProps,
  RowSelectionProps,
} from '@arco-design/web-react/es/Table';

export interface ToolsProps {
  label?: string | ReactNode;
  key?: string;
  type?: string;
  btnType?: string;
  disabled?: boolean;
  auth?: any;
  spin?: boolean;
  visible?: boolean | ((record?: any) => boolean);
  confirm?: object;
  onClick?: (table: TableInstance) => any;
  tooltip?: TooltipProps | ReactNode;
  menu?: any;
  icon?: ReactNode;
  modalFormProps?:
    | ModalFormProps
    | ((table: TableInstance) => ModalFormProps | Promise<ModalFormProps>);
  drawerFormProps?:
    | DrawerFormProps
    | ((table: TableInstance) => DrawerFormProps | Promise<DrawerFormProps>);
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
      type: 'Refresh'
    },
    {
      type: 'AdjustSize'
    },
    {
      type: 'FilterColumns'
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
  /** 自定义渲染表格函数 */
  tableRender?: (dom, dataSource) => ReactNode;
  /** Table api 的引用，便于自定义触发 */
  table?: TableInstance;
  /** 唯一标识 */
  tableId?: string;
  /** 是否开启拖拽 */
  drag?: boolean;
  /** 是否开启调整宽度 */
  resize?: boolean;
  /** 列信息 */
  dragColumn?: TableColumnType;
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
  /** 开启虚拟列表 */
  virtual?: boolean;
  /** 下滑加载数据 */
  loadMoreData?: Function;
}
