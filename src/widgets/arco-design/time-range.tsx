import { TimePicker, TimeRangePickerProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnly,
  splitLabel = '~',
  readOnlyEmptyValueNode = '-',
  ...props
}: TimeRangePickerProps & ExtendInputProps) => {
  if (readOnly) {
    // 渲染只读视图
    return (
      <span className="arco-time-range-picker-readonly">
        {props.value?.join(splitLabel) || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker.RangePicker {...props} />;
};
