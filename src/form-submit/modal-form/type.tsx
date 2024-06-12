import { ModalProps } from '@arco-design/web-react';
import { CSSProperties } from 'react';
import { FormSubmitProps } from '../type';

export interface ModalFormProps extends FormSubmitProps {
  /** 内容样式 */
  bodyStyle?: CSSProperties;
  /** 主样式 */
  style?: CSSProperties;
  /** 其余 Modal 属性设置 */
  modalProps?: ModalProps;
  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
  /** 宽 */
  width?: number | string;
  /** 高 */
  height?: number | string;
}

export default (props: ModalFormProps) => null;
