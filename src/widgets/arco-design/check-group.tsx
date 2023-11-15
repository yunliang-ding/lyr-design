import { Checkbox, CheckboxGroupProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';
import CheckGroupAll from './check-group-all';

export default ({
  readOnlyEmptyValueNode = '-',
  showCheckAll = false,
  readOnly,
  ...props
}: CheckboxGroupProps<any> & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    // 解析options得到labels
    const labels: any =
      props?.options
        ?.filter((i: any) => {
          return props?.value?.includes(i.value);
        })
        .map((i: any) => i.label) || [];
    return (
      <span className="arco-checkbox-readonly">
        {labels.join('、') || readOnlyEmptyValueNode}
      </span>
    );
  }
  return showCheckAll ? (
    <CheckGroupAll {...props} showCheckAll={showCheckAll} />
  ) : (
    <Checkbox.Group {...props} />
  );
};
