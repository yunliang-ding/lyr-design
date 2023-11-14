/** 全局设置 */
const globalConfig: GlobalConfigProps = {
  defaultInputMaxLength: 64,
  defaultOpenAllowClear: true,
  defaultFillPlaceholder: true,
  defaultShowInputCount: true,
  autoTransfromDatePicker: true,
};

interface GlobalConfigProps {
  /** 默认输入框最大长度 */
  defaultInputMaxLength?: number;
  /** 是否开启自动填充 placeholder */
  defaultFillPlaceholder?: boolean;
  /** 是否开启自动清空 */
  defaultOpenAllowClear?: boolean;
  /** 是否支持自动转换日期选择器moment和string */
  autoTransfromDatePicker?: boolean;
  /** 输入框失去焦点自动清除前后空格 */
  autoTrimInputSpaceOnBlur?: boolean;
  /** 默认展示输入框的计数器 */
  defaultShowInputCount?: boolean;
}

export const getGlobalConfig = () => {
  return globalConfig;
};

export const setGlobalConfig = (config: GlobalConfigProps = {}) => {
  Object.assign(globalConfig, config);
};

export default (config: GlobalConfigProps) => {
  Object.assign(globalConfig, config);
};
