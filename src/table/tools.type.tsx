import { TooltipProps } from "@arco-design/web-react";
import { ReactNode } from "react";
import { DrawerFormProps, ModalFormProps } from "..";
import { TableInstance } from "./instance.type";

export interface ToolsProps {
  label?: ReactNode;
  key?: string;
  type?: string;
  btnType?: string;
  disabled?: boolean;
  auth?: any;
  spin?: boolean;
  visible?: boolean | ((record?: any) => boolean);
  confirm?: object;
  onClick?: (table: TableInstance) => any;
  tooltip?: TooltipProps | ReactNode;
  menu?: any;
  icon?: ReactNode;
  modalFormProps?:
    | ModalFormProps
    | ((table: TableInstance) => ModalFormProps | Promise<ModalFormProps>);
  drawerFormProps?:
    | DrawerFormProps
    | ((table: TableInstance) => DrawerFormProps | Promise<DrawerFormProps>);
}

export default (props: ToolsProps) => null;