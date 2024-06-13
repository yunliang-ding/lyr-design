import { CSSProperties, ReactNode } from "react";

export interface SuspendProps {
  /** 容器内容 */
  content: ReactNode;
  /**
   * 顶部距离
   * @default 50%
   */
  top?: string;
  /**
   * 位置
   * @default right
   */
  placement?: 'left' | 'right';
  /** 样式 */
  closeStyle?: CSSProperties;
  /** 实例引用 */
  suspendRef?: any;
  show: boolean;
}

export default (props: SuspendProps) => null;