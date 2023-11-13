import { Select, SelectProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

export default ({
  readOnlyEmptyValueNode = '-',
  fieldNames = { value: 'value', label: 'label' },
  readOnly,
  ...props
}: SelectProps & ExtendInputProps) => {
  if (readOnly) {
    // 渲染只读视图
    const values = Array.isArray(props.value) ? props.value : [props.value];
    // 解析options得到labels
    const labels: any =
      props?.options
        ?.filter((i: any) => {
          return values.includes(i[fieldNames.value]);
        })
        .map((i: any) => i[fieldNames.label]) || [];
    return (
      <span className="ant-select-readonly">
        {labels.join('、') || readOnlyEmptyValueNode}
      </span>
    );
  }
  console.log(props);
  return <Select {...props} />;
};
