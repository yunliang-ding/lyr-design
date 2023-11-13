import { DatePicker, RangePickerProps } from '@arco-design/web-react';
import moment from 'moment';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  splitLabel = '~',
  ...props
}: RangePickerProps & ExtendInputProps) => {
  if (readOnly) {
    // 渲染只读视图
    const labels = props.value?.map((item: any) => {
      return moment.isMoment(item)
        ? moment(item).format((props.format as string) || 'YYYY-MM-DD')
        : item;
    });
    return (
      <span className="ant-range-picker-readonly">
        {labels?.join(splitLabel) || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <DatePicker.RangePicker {...props} />;
};
