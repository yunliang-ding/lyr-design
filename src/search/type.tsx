import { CoreFormProps } from '../form/form.type';
import { ReactNode } from 'react';

export interface SearchProps extends Omit<CoreFormProps, 'onReset'> {
  /** 是否展示 */
  hidden?: boolean; // 是否需要展示
  /** 查询的回调 */
  onSearch?: Function;
  /** 是否调整按钮位置 */
  toolReverse?: boolean;
  /** 开启默认开展更多 */
  defaultExpand?: boolean;
  /** 重置的回调 */
  onReset?: () => void;
  /** 点击重置是否清空默认值 */
  clearInitialValuesOnReset?: boolean;
  searchBtnRender?: ReactNode;
}

export default (props: SearchProps) => null;