import { DatePicker } from '@arco-design/web-react';

export default ({ readOnly, readOnlyEmptyValueNode = '-', ...props }) => {
  if (readOnly) {
    return (
      <span className="ant-date-picker-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <DatePicker {...props} />;
};
