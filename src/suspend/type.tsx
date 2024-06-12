import { CSSProperties, ReactNode } from "react";

export interface SuspendProps {
  /** 容器内容 */
  content?: ReactNode;
  /**
   * 是否默认弹出
   * @default true
   */
  show: boolean;
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
}

export default (props: SuspendProps) => null;