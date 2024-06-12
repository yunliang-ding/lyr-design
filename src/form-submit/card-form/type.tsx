import { CardProps } from '@arco-design/web-react';
import { FormSubmitProps } from '../type';

export interface CardFormProps extends FormSubmitProps {
  /** 宽度 */
  width?: number | string;
  /** Card属性设置 */
  cardProps?: CardProps;
  /** 清空表单 */
  onClear?: Function;
}

export default (props: CardFormProps) => null;
