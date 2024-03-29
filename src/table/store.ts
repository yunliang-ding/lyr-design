import { create } from 'lyr-hooks';

export default create<{
  payload?: any; // 查询参数
  _columns?: any[]; // 表格列
  _filterIds?: string[]; // 不展示的列
  refresh?: boolean; // 重新渲染
  loading?: boolean; // 加载中
  dataSource?: any[]; // 数据源
  pagination?: any; // 分页配置
}>({});
