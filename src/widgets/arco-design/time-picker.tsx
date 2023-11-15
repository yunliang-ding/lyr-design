import { TimePicker, TimePickerProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnly,
  readOnlyEmptyValueNode = '-',
  ...props
}: TimePickerProps & ExtendInputProps) => {
  if (readOnly) {
    return (
      <span className="arco-time-picker-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker {...props} />;
};
