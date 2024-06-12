import { DrawerProps } from '@arco-design/web-react';
import { FormSubmitProps } from '../type';

export interface DrawerFormProps extends FormSubmitProps {
  /** Drawer属性设置 */
  drawerProps?: DrawerProps;
  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
  /** 宽度 */
  width?: number | string;
}
export default (props: DrawerFormProps) => null;
