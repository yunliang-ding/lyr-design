import {
  InputProps,
  InputNumberProps,
  AutoCompleteProps,
  SelectProps,
  SwitchProps,
  RateProps,
  RadioProps,
  RadioGroupProps,
  DatePickerProps,
  TimePickerProps,
  TimeRangePickerProps,
  CheckboxProps,
  TreeSelectProps,
  UploadProps,
  FormItemProps,
} from '@arco-design/web-react';
import { ReactNode } from 'react';
import { CoreFormInstance } from './type.instance';
import { BuiltInWidgetMapping } from '../widgets';

export interface AsyncSelectProps extends Omit<SelectProps, 'options'> {
  options?: any[] | ((form: CoreFormInstance) => any);
}

export type FieldProps =
  | InputProps
  | InputNumberProps
  | AutoCompleteProps
  | UploadProps
  | SwitchProps
  | RateProps
  | AsyncSelectProps
  | RadioProps
  | RadioGroupProps
  | CheckboxProps
  | DatePickerProps
  | TimePickerProps
  | TimeRangePickerProps
  | TreeSelectProps
  | ExtensionProps;

/** SchemaProps */
export interface SchemaProps<T = FieldProps>
  extends Omit<FormItemProps, 'required' | 'disabled'> {
  key?: string | number;
  type?: keyof typeof BuiltInWidgetMapping | Function | string;
  name?: string;
  column?: number;
  /** 配置是否展示 */
  visible?: (values: any) => boolean;
  /**
   * 占据的格子数
   * @default          1
   */
  span?: number;
  /**
   * 查询表单 是否点击更多展开
   * @default          false
   */
  expand?: boolean;
  /**
   * 查询表单 改变是否触发查询
   * @default          false
   */
  autoSearch?: boolean;
  /** 自定义渲染逻辑(支持异步) */
  itemRender?: (
    dom: React.ReactNode,
    options: {
      field: SchemaProps;
      form: CoreFormInstance;
      disabled: boolean;
      readonly: boolean;
    },
  ) => React.ReactNode;
  /** 设置副作用，当设置的字段发生变化时，会自动触发渲染 */
  effect?: string[];
  /** 副作用变化时 自动重置字段 */
  effectClearField?: boolean;
  /** 副作用执行的钩子 */
  onEffect?: (name: string, form: CoreFormInstance) => void;
  /** formItem 样式 */
  style?: React.CSSProperties;
  /** gridItem 样式 */
  gridItemStyle?: React.CSSProperties;
  /** 是否必填 */
  required?: ((form: CoreFormInstance) => boolean) | boolean;
  /** 是否只读 */
  readOnly?: ((form: CoreFormInstance) => boolean) | boolean;
  /** 是否禁用 */
  disabled?: ((form: CoreFormInstance) => boolean) | boolean;
  /** 表单项属性设置 */
  props?: FieldProps | T;
}

/** 添加扩展属性 */
export interface ExtensionProps {
  style?: React.CSSProperties;
  // Render、AsyncRender
  render?: (
    CoreFormInstance: CoreFormInstance,
  ) => Promise<React.ReactNode> | React.ReactNode;
  spin?: boolean;
  limitSize?: number;
  text?: string;
  // AsyncCascader
  initOptions?: (defaultValue: any, CoreFormInstance: CoreFormInstance) => void;
  loadData?: Function;
  // DebounceSelect
  fetchOptions?: (keyword: string, CoreFormInstance: CoreFormInstance) => void;
  debounceTimeout?: number;
  mode?: 'multiple' | 'tags' | 'split';
  // FormList
  label?: string | React.ReactNode;
  maxCount?: number;
  leastOne?: boolean;
  grid?: any;
  schema?: SchemaProps[];
  operation?: boolean;
  // BlockQuote
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  // TextArea
  showWordLimit?: boolean;
  // FieldSet
  column?: number;
  children?: SchemaProps[];
  extra?: ReactNode[];
  // 只读模式下日期范围的分割符默认 ~
  splitLabel?: string;
  // EditableTable
  rowKey?: string;
  columns?: any;
  creatorButtonProps?: any;
  // AsyncSelect 空提示信息
  emptyDescription?: ReactNode | string;
  showCheckAll?:
    | boolean
    | {
        text: ReactNode;
      };
  /**
   * 是否开异步启下拉选缓存
   * @default   true
   */
  openOptionsCache?: boolean;
}
const Hello: React.FC<SchemaProps<{}>> = () => null;

export default Hello;
