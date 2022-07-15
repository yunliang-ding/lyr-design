import { Input } from 'antd';

const _Input_ = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="ant-input-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Input {...props} />;
};
_Input_.displayName = 'Input';
export default _Input_;
