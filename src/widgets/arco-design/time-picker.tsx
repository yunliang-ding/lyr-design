import { TimePicker } from '@arco-design/web-react';

export default ({ readOnly, readOnlyEmptyValueNode = '-', ...props }) => {
  if (readOnly) {
    return (
      <span className="ant-time-picker-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker {...props} />;
};
