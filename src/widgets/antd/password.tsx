import { Input } from 'antd';

export default ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    return <span className="ant-password-readonly">******</span>;
  }
  return <Input.Password {...props} />;
};
