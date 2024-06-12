import { FormProps } from '@arco-design/web-react';
import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { CoreFormInstance } from './instance.type';
import { SchemaProps } from './item.type';

/** FormProps */
export interface CoreFormProps extends Omit<FormProps, 'form'> {
  /**
   * 表单的数据模型
   * @default          []
   */
  schema?: SchemaProps[] | ((form: CoreFormInstance) => SchemaProps[]);
  /**
   * 注入自定义组件
   */
  widgets?: {
    [key: string]: string | ((props: any) => ReactElement);
  };
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
   * @default          {colGap: 20, rowGap: 0}
   */
  gridStyle?: {
    colGap?: number;
    rowGap?: number;
  };
  /**
   * 最外层类名
   */
  className?: string;
  /**
   * 表单加载完的钩子
   */
  onMount?: (form: CoreFormInstance) => void;
  /** 滚动的区域 */
  getScrollContainer?: () => HTMLElement;
  /** 只读表单的空提示 */
  readOnlyEmptyValueNode?: ReactNode | string;
  useForm?: FormRefInstance[];
  form?: CoreFormInstance;
  key?: string | number;
  forceRender?: any;
}

export interface FormRefInstance extends Omit<MutableRefObject<{}>, 'current'> {
  current: CoreFormInstance;
}

export default (props: CoreFormProps) => null;