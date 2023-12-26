import { TreeSelect, TreeSelectProps } from '@arco-design/web-react';
import { ExtendInputProps } from '..';

const queryLoop = (
  data,
  value,
  fieldNames = { value: 'key', label: 'title', children: 'children' },
  labels = [],
) => {
  data.some((item) => {
    if (item[fieldNames.value] === value) {
      // 匹配到结束
      // eslint-disable-next-line no-param-reassign
      labels.push(item[fieldNames.label]);
      return true; // 终止循环
    } else if (Array.isArray(item[fieldNames.children])) {
      queryLoop(item[fieldNames.children], value, fieldNames, labels);
    }
    return false;
  });
};

export default ({
  readOnlyEmptyValueNode = '-',
  readOnly,
  ...props
}: TreeSelectProps & ExtendInputProps) => {
  // 渲染只读视图
  if (readOnly) {
    // 解析options得到label
    // TODO 仅支持单选
    const labels: any = []; // 设置为引用类型
    queryLoop(props?.treeData, props.value, props.fieldNames, labels);
    return (
      <span className="arco-tree-select-readonly">
        {labels.join('、') || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TreeSelect {...props} />;
};
