import { Slider } from 'antd';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
  // 渲染只读视图
  return <Slider {...props} disabled={props.disabled || props.readOnly} />;
};
