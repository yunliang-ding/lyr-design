import { ActionProps } from '../form-submit/action.type';
import { SchemaProps } from './item.type';

export interface CoreFormInstance {
  /** 设置新的默认值、之后Form会重新渲染 */
  setInitialValues: (value: any) => void;
  /** 手动清空所有值，不会还原到默认值 */
  clearValues: (names?: string[]) => void;
  /** 更新指定表单项的配置，重新渲染该组件 */
  setSchemaByName: (names: string, newField: SchemaProps, customizer?) => void;
  /** 获取指定的field */
  getSchemaByName: (name: string) => any;
  /** 主动触发一批字段重新渲染，在一定程度上可以取代 effect */
  touchSchemaRender: (names: string[]) => void;
  /** 获取异步选择 options */
  getFieldOption: (fieldName: string) => Promise<any>;
  /** 手动暂存 options  */
  setFieldOption: (fieldName: string, options: any) => void;
  /** 作为 SearchForm 时候提供查询功能   */
  search: (value?: any) => void;
  /** 作为 SearchForm 时候提供刷新功能  */
  refresh: () => void;
  reset: () => void;
  /** 获取表单校验之后的数据 */
  submit: () => any;
  /** 获取FormList api */
  formListInstance?: {
    [key: string]: any;
  };
  /** 控制表单是否加载中 */
  setFormLoading: (state: boolean) => void;
  /** 控制提交表单操纵栏是否禁用 */
  setFooterDisabled: (state: boolean) => void;
  /** 控制提交表单操纵栏项 */
  setFooterActions: (actions: ActionProps[]) => void;
  // RcForm
  name?: string;
  initialValues?: any;
  setFieldsValue: (value: any) => void;
  getFieldValue: (name: string) => any;
  validateFields: (nameList?: []) => Promise<any>;
  getFieldsValue: (
    nameList?: string[] | true,
    filterFunc?: (meta: any) => boolean,
  ) => any;
  resetFields: (fields?: string[]) => void;
  getFieldError?: (name?: string) => string[];
  getFieldsError?: (nameList?: string[]) => any[];
  isFieldsTouched?: (allFieldsTouched?: boolean) => boolean;
  isFieldTouched?: (name?: string) => boolean;
  isFieldValidating?: (name?: string) => boolean;
  isFieldsValidating?: (nameList?: string[]) => boolean;
  setFields?: (fields?: any[]) => void;
}

export default (props: CoreFormInstance) => null;