/** 全局设置 */
const globalConfig: GlobalConfigProps = {
  defaultInputMaxLength: 64,
  defaultOpenAllowClear: true,
  defaultFillPlaceholder: true,
  defaultShowInputCount: true,
  autoTrimInputSpaceOnBlur: true,
  defaultShowSearch: true,
  defaultSetPopupContainer: true,
};

interface GlobalConfigProps {
  /** 默认输入框最大长度 */
  defaultInputMaxLength?: number;
  /** 是否开启自动填充 placeholder */
  defaultFillPlaceholder?: boolean;
  /** 是否开启自动清空 */
  defaultOpenAllowClear?: boolean;
  /** 输入框失去焦点自动清除前后空格 */
  autoTrimInputSpaceOnBlur?: boolean;
  /** 默认展示输入框的计数器 */
  defaultShowInputCount?: boolean;
  /** 默认开启模糊查询 */
  defaultShowSearch?: boolean;
  /** 默认给下拉选设置 PopupContainer */
  defaultSetPopupContainer?: boolean;
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
