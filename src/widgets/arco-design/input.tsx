import { getGlobalConfig } from '@/config';
import { Input, InputProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: InputProps & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    return (
      <span className="arco-input-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  const { autoTrimInputSpaceOnBlur } = getGlobalConfig();
  return (
    <Input
      autoComplete="off"
      {...props}
      onBlur={(e) => {
        if (autoTrimInputSpaceOnBlur) {
          props.onChange(e.target.value?.trim?.(), e);
        }
        props.onBlur?.(e);
      }}
    />
  );
};
