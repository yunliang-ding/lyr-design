import { Cascader } from 'antd';

const queryLoop = (
  data, // 数据源
  value, // 值
  fieldNames = { value: 'value', label: 'label', children: 'children' }, // 字段别名
  labels = [], // 存储器
  level = 0, // 层级
) => {
  data.some((item) => {
    if (item[fieldNames.value] === value?.[level]) {
      labels.push(item[fieldNames.label]);
    }
    if (Array.isArray(item[fieldNames.children])) {
      queryLoop(
        item[fieldNames.children],
        value,
        fieldNames,
        labels,
        level + 1,
      );
    }
    return false;
  });
};

export default ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    // 解析options得到label
    // TODO 仅支持单选
    const labels = [];
    queryLoop(props?.options, props.value, props.fieldNames, labels);
    return (
      <span className="ant-cascader-readonly">
        {labels.join('/') || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <Cascader {...props} />;
};
