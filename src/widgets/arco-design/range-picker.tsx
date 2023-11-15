import { DatePicker, RangePickerProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  splitLabel = '~',
  ...props
}: RangePickerProps & ExtendInputProps) => {
  if (readOnly) {
    // 渲染只读视图
    return (
      <span className="arco-range-picker-readonly">
        {props.value?.join(splitLabel) || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <DatePicker.RangePicker {...props} />;
};
