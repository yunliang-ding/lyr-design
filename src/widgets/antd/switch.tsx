import { Switch } from 'antd';

const __Switch__ = (props: any) => {
  return <Switch {...props} disabled={props.disabled || props.readOnly} />;
};
__Switch__.displayName = 'Switch';
export default __Switch__;
