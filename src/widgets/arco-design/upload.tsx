/* eslint-disable @typescript-eslint/no-unused-vars */
import { Upload, UploadProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  ...props
}: UploadProps & ExtendInputProps) => {
  return <Upload {...props} />;
};
