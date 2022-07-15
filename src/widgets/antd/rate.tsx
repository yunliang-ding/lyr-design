import { Rate } from 'antd';

const __Rate__ = (props: any) => {
  return <Rate {...props} disabled={props.disabled || props.readOnly} />;
};
__Rate__.displayName = 'Rate';
export default __Rate__;
