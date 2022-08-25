import { DatePicker, Space } from 'antd';
import moment from 'moment';
import './range-picker.less';
/**
 分开的交互
*/
const SplitRangerPicker = ({
  value = [],
  onChange = () => {},
  form,
  name,
  ...props
}: any) => {
  const onInnerChange = (start, end) => {
    // 如果结束时间小于开始时间，进行调换位置处理
    if (moment(end).isBefore(moment(start))) {
      return onChange([end, start]);
    } else {
      onChange([start, end]);
    }
  };
  return (
    <div className="react-core-form-split-range-picker">
      <Space>
        <DatePicker
          value={value[0]}
          {...props}
          onChange={(v) => {
            onInnerChange(v, value[1]);
          }}
        />
        <DatePicker
          value={value[1]}
          {...props}
          onChange={(v) => {
            onInnerChange(value[0], v);
          }}
        />
      </Space>
    </div>
  );
};
/**
 * 官方内置的交互
 */
export default ({
  mode = 'default',
  readOnlyEmptyValueNode = '-',
  ...props
}: any) => {
  if (props.readOnly) {
    // 渲染只读视图
    const labels = props.value?.map((item: any) => {
      return moment.isMoment(item)
        ? moment(item).format(props.format || 'YYYY-MM-DD')
        : item;
    });
    return (
      <span className="ant-range-picker-readonly">
        {labels?.join(props.splitLabel || ' ~ ') || readOnlyEmptyValueNode}
      </span>
    );
  }
  if (mode === 'split') {
    // 拆分成独立的两个日期选择，默认的交互不友好
    return <SplitRangerPicker {...props} />;
  }
  return <DatePicker.RangePicker {...props} />;
};
