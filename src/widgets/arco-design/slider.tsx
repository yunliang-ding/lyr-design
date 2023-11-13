import { Slider } from '@arco-design/web-react';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  // 渲染只读视图
  return <Slider {...props} disabled={props.disabled || props.readOnly} />;
};
