import { ReactNode } from 'react';
import {
  ButtonProps,
  PopconfirmProps,
  TooltipProps,
} from '@arco-design/web-react';
import { DrawerFormProps, ModalFormProps } from '..';

export interface BtnProps extends ButtonProps {
  [key: string]: any;
}

export interface ProBtnProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * 是否按照点击事件自动加载loading
   * @default false
   */
  spin?: boolean;
  /**
   * 二次确认的配置
   */
  confirm?: PopconfirmProps & {
    type?: 'pop' | 'alert';
    content?: React.ReactNode;
  };
  /**
   * 配置权限
   */
  auth?: string;
  /**
   * 前置点击事件
   */
  onBeforeClick?: () => void;
  /**
   * 点击事件
   */
  onClick?: () => void;
  /**
   * 是否可见
   * @default true
   */
  visible?: boolean;
  /**
   * 绑定 弹出层
   */
  modalFormProps?: ModalFormProps | (() => Promise<ModalFormProps>);
  /**
   * 绑定 抽屉
   */
  drawerFormProps?: DrawerFormProps | (() => Promise<DrawerFormProps>);
  [key: string]: any;
  /** hover提示文案 */
  tooltip?: TooltipProps | ReactNode;
}

export default (props: ProBtnProps) => null;