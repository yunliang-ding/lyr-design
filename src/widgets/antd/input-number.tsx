import { InputNumber } from 'antd';

export default ({ readOnlyEmptyValueNode = '-', ...props }) => {
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
