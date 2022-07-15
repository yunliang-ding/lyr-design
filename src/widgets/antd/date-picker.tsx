import { DatePicker } from 'antd';
import moment from 'moment';

const __DatePicker__ = ({ readOnlyEmptyValueNode, ...props }) => {
  if (props.readOnly) {
    // 渲染只读视图
    const label = moment.isMoment(props.value)
      ? moment(props.value).format(props.format || 'YYYY-MM-DD')
      : props.value;
    return (
      <span className="ant-date-picker-readonly">
        {label || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <DatePicker {...props} />;
};
__DatePicker__.displayName = 'DatePicker';
export default __DatePicker__;
