/* eslint-disable no-nested-ternary */
import { TableProps } from './table/types';
import { CoreFormProps } from './form/type.form';
import { DrawerFormProps } from './form-submit/types';
import { cloneDeep } from './util';

/** 全局设置 */
const globalConfig = {};

interface GlobalConfigProps {
  Antd?: {
    /** 默认输入框最大长度 */
    defaultInputMaxLength?: number;
    /** 是否开启自动填充 placeholder */
    defaultFillPlaceholder?: boolean;
    /** 是否开启自动清空 */
    defaultOpenAllowClear?: boolean;
    /** 是否自动为选择器挂载Popup容器 */
    autoSetPopupContainer?: boolean;
    /** 是否支持自动转换日期选择器moment和string */
    autoTransfromDatePicker?: boolean;
    /** 输入框失去焦点自动清除前后空格 */
    autoTrimInputSpaceOnBlur?: boolean;
    /** 默认展示输入框的计数器 */
    defaultShowInputCount?: boolean;
  };
  Form?: ((props) => CoreFormProps) | CoreFormProps;
  DrawerForm?: ((props) => DrawerFormProps) | DrawerFormProps;
  Table?: ((props) => TableProps) | TableProps;
}

export const getGlobalConfigByName = (key, props = {}) => {
  const config = globalConfig?.[key];
  const defaultProps = config
    ? typeof config === 'function'
      ? config(props)
      : config
    : {};
  return cloneDeep(defaultProps);
};

export default (config: GlobalConfigProps) => {
  Object.assign(globalConfig, config);
};
