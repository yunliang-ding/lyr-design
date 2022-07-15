import { FormProps } from 'antd';
import { MutableRefObject, ReactNode } from 'react';
import { CoreFormInstance } from './type.instance';
import { SchemaProps } from './type.item';

/** Form 统一配置 */
export interface FormConfigProps {
  /** 默认计数输入框最大长度 */
  defaultInputMaxLength?: number;
  /** 是否开启自动填充 placeholder */
  defaultOpenPlaceholder?: boolean;
  /** 是否开启自动清空 */
  defaultOpenAllowClear?: boolean;
  /** 是否自动为选择器挂载Popup容器 */
  autoSetPopupContainer?: boolean;
  /** 是否支持自动转换日期选择器moment和string */
  autoTransfromDatePicker?: boolean;
  /** 是否默认开启选择器模糊搜索功能 */
  autoSelectSearch?: boolean;
}

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
  /** 表单通用配置 */
  formConfig?: FormConfigProps;
  useForm?: FormRefInstance[];
  form?: CoreFormInstance;
  search?: boolean;
  key?: string | number;
}

export interface FormRefInstance extends Omit<MutableRefObject<{}>, 'current'> {
  current: CoreFormInstance;
}

const Hello: React.FC<CoreFormInstance> = () => null;

export default Hello;
