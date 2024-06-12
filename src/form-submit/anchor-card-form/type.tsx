import { AnchorCardProps } from "../../anchor-card/type";
import { CardFormProps } from "../card-form/type";

export interface AnchorCardFormProps extends AnchorCardProps {
  /** form 属性 */
  formProps: CardFormProps;
  /** 外层容器名 */
  className?: string;
  /** 容器高度 */
  height: number;
}

export default (props: AnchorCardFormProps) => null;