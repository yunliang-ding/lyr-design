/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutoComplete, AutoCompleteProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  ...props
}: AutoCompleteProps & ExtendInputProps) => {
  return <AutoComplete {...props} />;
};
