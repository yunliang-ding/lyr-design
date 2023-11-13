import { Rate } from '@arco-design/web-react';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  return <Rate {...props} disabled={props.disabled || props.readOnly} />;
};
