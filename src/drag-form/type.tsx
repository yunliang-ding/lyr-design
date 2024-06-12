import { CardFormProps, SchemaProps } from "..";

export interface DragFormProps extends CardFormProps {
  /** 拖拽结束 */
  onChange?(list: any): void;
  /** 切换事件 */
  onSelected?(list: any): void;
  /** 选中的key */
  selectedKey?: string;
  /** 数据源 */
  items: SchemaProps[];
  /** 表单类型 */
  type?: 'search' | 'card';
}

export default (props: DragFormProps) => null;