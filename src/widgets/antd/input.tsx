import { Input } from 'antd';

export default ({ readOnlyEmptyValueNode, ...props }) => {
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
