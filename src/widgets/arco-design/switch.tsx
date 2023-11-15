/* eslint-disable @typescript-eslint/no-unused-vars */
import { Switch, SwitchProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: SwitchProps & ExtendInputProps) => {
  if (readOnly) {
    return props.checked
      ? props.checkedText || '开启'
      : props.uncheckedText || '关闭';
  }
  return <Switch {...props} />;
};
