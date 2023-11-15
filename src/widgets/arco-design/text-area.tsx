import { Input, TextAreaProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnly,
  readOnlyEmptyValueNode = '-',
  ...props
}: TextAreaProps & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    return (
      <span className="arco-text-area-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Input.TextArea {...props} />;
};
