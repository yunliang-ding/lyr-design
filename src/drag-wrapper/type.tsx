import { CSSProperties, ReactNode } from "react";

export interface DragWrapperProps {
  /** 配置项 */
  items?: {
    key: number | string;
    content: ReactNode;
  }[];
  /** 容器样式 */
  style?: CSSProperties;
  /** 改变的钩子 */
  onChange?: Function;
  /** 是否允许接受外部组件 */
  accept?: boolean;
  children?: ReactNode;
  dragId?: string;
}

export default (props: DragWrapperProps) => null;