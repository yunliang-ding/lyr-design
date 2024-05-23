import { Select, SelectProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

const WidgetSelect = ({
  readOnlyEmptyValueNode = '-',
  fieldNames = { value: 'value', label: 'label' },
  readOnly,
  options = [],
  ...props
}: SelectProps & ExtendInputProps) => {
  if (readOnly) {
    // 渲染只读视图
    const values = Array.isArray(props.value) ? props.value : [props.value];
    // 解析options得到labels
    const labels: any =
      options
        ?.filter((i: any) => {
          return values.includes(i[fieldNames.value]);
        })
        .map((i: any) => i[fieldNames.label]) || [];
    return (
      <span className="arco-select-readonly">
        {labels.join('、') || readOnlyEmptyValueNode}
      </span>
    );
  }
  const newOptions = options.map((item: any) => ({
    label: item[fieldNames.label],
    value: item[fieldNames.value],
    ...item,
  }));
  return <Select options={newOptions} {...props} />
};

WidgetSelect.displayName = 'Select';

export default WidgetSelect;
