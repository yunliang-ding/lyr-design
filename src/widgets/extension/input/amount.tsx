/* eslint-disable radix */
import { NumberFormat } from '@/table/util';
import { InputNumber } from 'antd';
/**
 * 金额输入框、开启千分位、默认最多15位数字、最小值为0、小数点默认2位
 */
const AmountInput = ({
  precision = 2,
  maxLength = 15,
  min = 0,
  addonAfter = '元',
  formatter = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  parser = (value) => {
    return value.replace(/\$\s?|(,*)/g, '');
  },
  readOnly,
  ...props
}) => {
  // 渲染只读视图
  if (readOnly) {
    return (
      <span className="readonly-count-input">{NumberFormat(props.value)}</span>
    );
  }
  const handelChange = (value) => {
    // 截取
    if (String(value).length > maxLength) {
      value = Number(String(value).substr(0, maxLength));
    }
    /**
     * 超过小数位数不展示
     */
    if (precision) {
      value = Number(value).toFixed(precision);
    } else {
      value = Number.parseInt(value);
    }
    // 关联form
    props.onChange(Number(value));
  };
  const _props = {};
  Object.keys(props).forEach((key: string) => {
    // 不传递的属性
    if (!['form', 'name', 'precision', 'type', 'maxLength'].includes(key)) {
      _props[key] = props[key];
    }
  });
  return (
    <InputNumber
      min={min}
      addonAfter={addonAfter}
      {..._props}
      /** 强制覆盖传递的属性 */
      stringMode
      onChange={handelChange}
      formatter={formatter}
      parser={parser}
    />
  );
};
AmountInput.displayName = 'AmountInput';
export default AmountInput;
