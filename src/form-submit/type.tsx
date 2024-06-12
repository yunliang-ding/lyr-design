import { ReactNode } from 'react';
import { CoreFormProps } from '../form/form.type';
import { ActionProps } from './action.type';

export interface FormSubmitProps extends CoreFormProps {
  footer?: boolean;
  /** 定义操作按钮 */
  actions?: ActionProps[];
  /**
   * 操作按钮的布局方式
   * @default end
   */
  actionAlign?: 'start' | 'center' | 'end';
  /** 取消事件 */
  onClose?: (e?: any) => void;
  /** 提交事件 */
  onSubmit?: (values: any) => void;
  /**
   * 取消的文案
   * @default 取消
   */
  cancelText?: string;
  /**
   * 确定的文案
   * @default 确定
   */
  okText?: string;
  /**
   * 自定义渲染
   */
  render?: ({ value, onChange }) => ReactNode;
  /** 自定义渲染底部操作 */
  footerRender?: (form) => ReactNode;
}

export default (props: FormSubmitProps) => null;
