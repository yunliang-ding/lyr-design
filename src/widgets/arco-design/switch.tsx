import { Switch } from '@arco-design/web-react';

export default ({ readOnlyEmptyValueNode = '-', readOnly, ...props }) => {
  if (readOnly) {
    return props.checked
      ? props.checkedChildren || '开启'
      : props.unCheckedChildren || '关闭';
  }
  return <Switch {...props} disabled={props.disabled} />;
};
