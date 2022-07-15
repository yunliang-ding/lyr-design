import { Radio } from 'antd';

const RadioGroup = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    // 解析options得到label
    const option: any = props?.options?.find(
      (i: any) => i.value === props.value,
    );
    return (
      <span className="ant-radio-readonly">
        {option?.label || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Radio.Group {...props} />;
};
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
