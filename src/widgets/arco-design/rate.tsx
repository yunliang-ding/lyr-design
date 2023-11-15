/* eslint-disable @typescript-eslint/no-unused-vars */
import { Rate, RateProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: RateProps & ExtendInputProps) => {
  return <Rate {...props} disabled={props.disabled || readOnly} />;
};
