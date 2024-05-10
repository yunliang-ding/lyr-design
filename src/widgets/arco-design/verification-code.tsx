import {
  VerificationCode,
  VerificationCodeProps,
} from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...rest
}: VerificationCodeProps & ExtendInputProps) => {
  return <VerificationCode {...rest} />;
};
