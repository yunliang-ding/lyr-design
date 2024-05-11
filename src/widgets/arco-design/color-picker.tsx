import { ColorPicker, ColorPickerProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...rest
}: ColorPickerProps & ExtendInputProps) => {
  return readOnly ? String(rest.value || '') : <ColorPicker {...rest} />;
};
