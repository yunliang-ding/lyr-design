import { TooltipProps } from '@arco-design/web-react';
import { ReactNode } from 'react';
import { DrawerFormProps, ModalFormProps } from '..';
import { TableInstance } from './instance.type';

export interface ToolsProps {
  /** 内容 */
  label: ReactNode;
  /** 唯一标识 */
  key?: string;
  /** 类型 */
  type?: string;
  /** 按钮类型 */
  btnType?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 权限标识 */
  auth?: any;
  /** 是否加载 */
  spin?: boolean;
  /** 是否可见 */
  visible?: boolean | ((record?: any) => boolean);
  /** 二次确认配置 */
  confirm?: object;
  /** 点击事件 */
  onClick?: (table: TableInstance) => any;
  /** 悬浮提示 */
  tooltip?: TooltipProps | ReactNode;
  /** 子菜单 */
  menu?: any;
  /** 图标 */
  icon?: ReactNode;
  /** 配置 ModalForm */
  modalFormProps?:
    | ModalFormProps
    | ((table: TableInstance) => ModalFormProps | Promise<ModalFormProps>);
  /** 配置 DrawerForm */
  drawerFormProps?:
    | DrawerFormProps
    | ((table: TableInstance) => DrawerFormProps | Promise<DrawerFormProps>);
}

export default (props: ToolsProps) => null;
