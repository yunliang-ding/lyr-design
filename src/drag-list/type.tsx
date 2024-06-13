import { DragWrapperProps } from '../drag-wrapper/type';

export interface DragListProps extends DragWrapperProps {
  /** 列顺序改变事件 */
  onChange?: Function;
  /**
   * 是否展示图标
   * @default true
   */
  showIcon?: boolean;
  /** 宽度 */
  width?: number;
}

export default (props: DragListProps) => null;
