import { CoreFormProps } from '../form/type.form';
import { CardProps, DrawerProps, ModalProps } from '@arco-design/web-react';
import { CSSProperties, ReactNode } from 'react';
import { ActionProps } from './type.action';

interface FormSubmitProps extends CoreFormProps {
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
  confirmText?: string;
  /**
   * 自定义渲染
   */
  render?: ({ value, onChange }) => ReactNode;
  /** 自定义渲染底部操作 */
  footerRender?: (form) => ReactNode;
}

export interface CardFormProps extends FormSubmitProps {
  /** 宽度 */
  width?: number | string;
  /** Card属性设置 */
  cardProps?: CardProps;
  /** 清空表单 */
  onClear?: Function;
}

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

export interface ModalFormProps extends FormSubmitProps {
  /** 内容样式 */
  bodyStyle?: CSSProperties;
  /** Modal属性设置 */
  modalProps?: ModalProps;
  /**
   * 是否可见
   * @default false
   */
  visible?: boolean;
  /** 是否可拖拽 */
  drag?: boolean;
}
