export interface PaginationConfig {
  /**
   * 当前页码
   * @default 1
   */
  pageNum: number;
  /**
   * 页码大小
   * @default 10
   */
  pageSize: number;
  /**
   * 页码选择设置
   * @default [10, 20 ,50 ,100]
   */
  pageSizeOptions?: any;
  total?: number;
  /**
   * 是否展示页码选择
   * @default true
   */
  showSizeChanger?: boolean;
  /**
   * 是否展示跳转
   * @default true
   */
  showQuickJumper?: boolean;
  /**
   * 自定义渲染总计
   */
  showTotal?: (total: number) => string | React.ReactNode;
  /**
   * 页面改变回调
   */
  onChange?: (pagination: any, filters: any, sorter: any) => void;
}

const Hello: React.FC<PaginationConfig> = () => null;

export default Hello;
