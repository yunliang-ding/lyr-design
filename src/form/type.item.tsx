import {
  InputProps,
  InputNumberProps,
  AutoCompleteProps,
  SelectProps,
  SwitchProps,
  RateProps,
  SliderSingleProps,
  RadioProps,
  RadioGroupProps,
  DatePickerProps,
  TimePickerProps,
  TimeRangePickerProps,
  CheckboxProps,
  TreeSelectProps,
  UploadProps,
  FormItemProps,
} from 'antd';
import {
  TextAreaProps,
  PasswordProps,
  SearchProps,
  GroupProps,
} from 'antd/es/input';
import { ReactNode } from 'react';
import { CoreFormInstance } from './type.instance';

export interface AsyncSelectProps extends Omit<SelectProps<any>, 'options'> {
  options?: any[] | ((form: CoreFormInstance) => any);
}

/** SchemaProps */
export interface SchemaProps<T = FieldProps>
  extends Omit<FormItemProps, 'required'> {
  key?: string | number;
  type?:
    | 'AutoComplete'
    | 'Input'
    | 'InputNumber'
    | 'Rate'
    | 'Slider'
    | 'TextArea'
    | 'Password'
    | 'Select'
    | 'RadioGroup'
    | 'CheckGroup'
    | 'DatePicker'
    | 'TimePicker'
    | 'TimeRange'
    | 'RangePicker'
    | 'TreeSelect'
    | 'Cascader'
    | 'Upload'
    | 'Switch'
    | 'AsyncSelect'
    | 'AsyncTreeSelect'
    | 'DebounceSelect'
    | 'AsyncCascader'
    | 'AsyncCheckGroup'
    | 'AsyncRadioGroup'
    | 'Render'
    | 'AsyncRender'
    | 'FormList'
    | 'BlockQuote'
    | 'FieldSet'
    | 'UploadImage'
    | 'EditableTable'
    | String
    | Function;
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
  /** 会在initialValues拦截处理下 */
  beforeReceive?: (initialValues: any) => any;
  /** 会在submit提交拦截处理下 */
  transform?: (values: any) => object;
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
  effect?: Array<string | string[]>;
  /** 副作用变化时 自动重置字段 */
  effectClearField?: boolean;
  /** 副作用执行的钩子 */
  onEffect?: (name: string, form: CoreFormInstance) => void;
  /** 样式 */
  style?: React.CSSProperties;
  /** 是否必填 */
  required?: ((form: CoreFormInstance) => boolean) | boolean;
  /** 是否只读 */
  readOnly?: ((form: CoreFormInstance) => boolean) | boolean;
  /** 是否禁用 */
  disabled?: ((form: CoreFormInstance) => boolean) | boolean;
  /** 标签宽度 */
  labelWidth?: number;
  /** 别名常用于 日期范围等设置，内部自动转换 */
  nameAlise?: string[];
  /** 表单项属性设置 */
  props?: FieldProps | T;
}

export type FieldProps =
  | InputProps
  | PasswordProps
  | SearchProps
  | GroupProps
  | TextAreaProps
  | InputNumberProps
  | AutoCompleteProps
  | UploadProps
  | SwitchProps
  | RateProps
  | SliderSingleProps
  | AsyncSelectProps
  | RadioProps
  | RadioGroupProps
  | CheckboxProps
  | DatePickerProps
  | TimePickerProps
  | TimeRangePickerProps
  | TreeSelectProps<any>
  | ExtensionProps;

/** 添加扩展属性 */
export interface ExtensionProps {
  style?: React.CSSProperties;
  // Render、AsyncRender
  render?: (
    CoreFormInstance: CoreFormInstance,
  ) => Promise<React.ReactNode> | React.ReactNode;
  spin?: boolean;
  // UploadImage
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
  subLabel?: string | React.ReactNode;
  // TextArea
  showCount?: boolean;
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
