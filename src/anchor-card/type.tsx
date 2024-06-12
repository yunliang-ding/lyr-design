import { CardProps } from "@arco-design/web-react";
import { ReactNode } from "react";

export interface AnchorCardProps {
  /** 数据源描述 */
  list: {
    /** 唯一标识 */
    key?: string;
    /** 文案 */
    title: string;
    /** 内容 */
    content?: ReactNode;
    /** 卡片属性  */
    cardProps?: CardProps;
  }[];
  /** 容器的高度 */
  height: number;
  /** 默认选中 */
  defaultActivityKey?: string;
  children?: ReactNode;
  scrollElement?: string;
}

export default (props: AnchorCardProps) => null