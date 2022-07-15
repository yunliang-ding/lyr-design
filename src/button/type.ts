import {
  CreateModalFormProps,
  CreateDrawerFormProps,
} from '../form-submit/create-form';
import { ButtonProps, PopconfirmProps } from 'antd';

type Comfirm = PopconfirmProps & {
  type?: 'pop' | 'alert';
  content?: React.ReactNode;
};

export interface BtnProps extends ButtonProps {
  [key: string]: any;
}

export interface ProBtnProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * 点击是否有loading
   * @default false
   */
  spin?: boolean;
  /**
   * 二次确认的配置
   */
  confirm?: Comfirm;
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
   * CreateModalFormProps
   */
  modalFormProps?: CreateModalFormProps;
  /**
   * CreateDrawerFormProps
   */
  drawerFormProps?: CreateDrawerFormProps;
  [key: string]: any;
}
