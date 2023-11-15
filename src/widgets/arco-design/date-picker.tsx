import { DatePicker, DatePickerProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnly,
  readOnlyEmptyValueNode = '-',
  ...props
}: DatePickerProps & ExtendInputProps) => {
  if (readOnly) {
    return (
      <span className="arco-date-picker-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <DatePicker {...props} />;
};
