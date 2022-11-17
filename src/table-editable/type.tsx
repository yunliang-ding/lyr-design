export interface EditTableProps {
  rowKey: string;
  /** 列信息 */
  columns: any;
  /** 数据源 */
  value?: any;
  /** 数据即将改变 */
  onBeforeChange?: (value, values) => Promise<any>;
  /** 数据即将删除 */
  onBeforeDelete?: (value) => Promise<any>;
  /** 数据改变 */
  onChange?: (value) => void;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否支持排序 */
  sortable?: boolean;
  /** 底部按钮配置 */
  creatorButtonProps: any;
  /** 限制最大条数 */
  maxLength?: number;
  /** 添加按钮的位置 */
  position?: 'top' | 'bottom';
  /** 每次添加的默认值配置 */
  defaultAddValue?: (() => any) | any;
  actionRef?: any;
  name?: string;
}
