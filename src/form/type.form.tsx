import { FormProps } from '@arco-design/web-react';
import { MutableRefObject, ReactNode } from 'react';
import { CoreFormInstance } from './type.instance';
import { SchemaProps } from './type.item';

/** FormProps */
export interface CoreFormProps extends Omit<FormProps, 'fields' | 'form'> {
  /**
   * 表单的数据模型
   * @default          []
   */
  schema?: SchemaProps[] | ((form: CoreFormInstance) => SchemaProps[]);
  /**
   * 注入自定义组件
   */
  widgets?: any;
  /**
   * 是否只读
   * @default           false
   */
  readOnly?: boolean;
  /**
   * 是否禁用
   * @default           false
   */
  disabled?: boolean;
  /**
   * 等分布局属性
   * @default          1
   */
  column?: number;
  /**
   * 布局样式设置
   * @default          {columnGap: 20, rowGap: 0}
   */
  gridStyle?: any;
  /**
   * 最外层类名
   */
  className?: string;
  /**
   * 表单加载完的钩子
   */
  onMount?: (form: CoreFormInstance) => void;
  /** 国际化 */
  locale?: any;
  /** 滚动的区域 */
  getScrollContainer?: () => HTMLElement;
  /** 只读表单的空提示 */
  readOnlyEmptyValueNode?: ReactNode | string;
  useForm?: FormRefInstance[];
  form?: CoreFormInstance;
  search?: boolean;
  key?: string | number;
  forceRender?: any;
}

export interface FormRefInstance extends Omit<MutableRefObject<{}>, 'current'> {
  current: CoreFormInstance;
}

const Hello: React.FC<CoreFormProps> = () => null;

export default Hello;
