import { InputNumber } from 'antd';

const __InputNumber__ = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="ant-inputNumber-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <InputNumber {...props} />;
};
__InputNumber__.displayName = 'InputNumber';
export default __InputNumber__;
