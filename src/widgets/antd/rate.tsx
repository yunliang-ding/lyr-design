import { Rate } from 'antd';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  return <Rate {...props} disabled={props.disabled || props.readOnly} />;
};
