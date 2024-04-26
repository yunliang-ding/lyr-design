import { InputNumber, InputNumberProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: InputNumberProps & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    return (
      <span className="acro-inputNumber-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <InputNumber autoComplete="off" {...props} />;
};
