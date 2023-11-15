import { Radio, RadioGroupProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: RadioGroupProps & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    // 解析options得到label
    const option: any = props?.options?.find(
      (i: any) => i.value === props.value,
    );
    return (
      <span className="arco-radio-readonly">
        {option?.label || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Radio.Group {...props} />;
};
