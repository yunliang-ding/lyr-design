import { Switch } from 'antd';

export default ({ readOnlyEmptyValueNode, ...props }) => {
  return <Switch {...props} disabled={props.disabled || props.readOnly} />;
};
