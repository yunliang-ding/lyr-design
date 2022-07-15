import { Input } from 'antd';

const TextArea = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="ant-text-area-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Input.TextArea {...props} />;
};
TextArea.displayName = 'TextArea';
export default TextArea;
