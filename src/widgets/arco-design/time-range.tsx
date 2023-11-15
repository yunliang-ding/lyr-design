import { TimePicker } from '@arco-design/web-react';

export default ({
  readOnly,
  splitLabel = '~',
  readOnlyEmptyValueNode = '-',
  ...props
}) => {
  if (readOnly) {
    // 渲染只读视图
    return (
      <span className="ant-time-range-picker-readonly">
        {props.value?.join(splitLabel) || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker.RangePicker {...props} />;
};
