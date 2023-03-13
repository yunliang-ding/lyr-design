import { Switch } from 'antd';

export default ({ readOnlyEmptyValueNode = '-', readOnly, ...props }) => {
  if (readOnly) {
    return props.checked
      ? props.checkedChildren || '开启'
      : props.unCheckedChildren || '关闭';
  }
  return <Switch {...props} disabled={props.disabled} />;
};
