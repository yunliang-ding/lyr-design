import { TimePicker } from '@arco-design/web-react';
import moment from 'moment';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  if (props.readOnly) {
    // 渲染只读视图
    const labels = props.value?.map((item: any) => {
      return moment.isMoment(item) ? moment(item).format('HH:mm:ss') : item;
    });
    return (
      <span className="ant-time-range-picker-readonly">
        {labels?.join(props.splitLabel || ' ~ ') || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker.RangePicker {...props} />;
};
