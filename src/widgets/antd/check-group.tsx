import { Checkbox } from 'antd';

const CheckGroup = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    // 解析options得到labels
    const labels: any =
      props?.options
        ?.filter((i: any) => {
          return props?.value?.includes(i.value);
        })
        .map((i: any) => i.label) || [];
    return (
      <span className="ant-checkbox-readonly">
        {labels.join('、') || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Checkbox.Group {...props} />;
};

CheckGroup.displayName = 'CheckGroup';
export default CheckGroup;
