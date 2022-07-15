import { InputNumber, InputNumberProps } from 'antd';
/**
 * 银行卡输入框、每四位 自动添加空格
 */
const transfromValue = (value: string) => {
  return value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};
const BankCardInput = ({
  addonBefore = <i className="iconfont spicon-yinhangka" />,
  ...props
}: InputNumberProps) => {
  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="readonly-count-input">
        {transfromValue(String(props.value))}
      </span>
    );
  }
  return (
    <InputNumber
      addonBefore={addonBefore}
      {...props}
      controls={false}
      stringMode
      formatter={(value: string) => {
        return transfromValue(value);
      }}
    />
  );
};
BankCardInput.displayName = 'BankCardInput';
export default BankCardInput;
