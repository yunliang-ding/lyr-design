import { PaginationProps } from '@arco-design/web-react';

export interface PaginationConfig extends PaginationProps {
  /**
   * 当前页码
   * @default 1
   */
  pageNum: number;
}

const Hello: React.FC<PaginationConfig> = () => null;

export default Hello;
