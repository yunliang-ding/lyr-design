/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@arco-design/web-react';
import { InputPasswordProps } from '@arco-design/web-react/es/Input';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: InputPasswordProps & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    return <span className="arco-password-readonly">******</span>;
  }
  return <Input.Password {...props} />;
};
