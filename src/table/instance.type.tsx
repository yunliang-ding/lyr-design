export interface TableInstance {
  /** 获取数据源 */
  getDataSource: Function;
  /** 获取当前参数 */
  getParams: Function;
  /** 重新查询数据 */
  onSearch: (payload?) => void;
  /** 重置条件 */
  onReset: Function;
  /** 刷新当前页面 */
  onRefresh: Function;
  /** 设置选中的行 */
  setSelectRow: Function;
  /** 获取选中的行 */
  getSelectRow: Function;
  /** 设置展开的行 */
  setExpandedRowKeys: Function;
}

export default (props: TableInstance) => null;