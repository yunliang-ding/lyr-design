/**
 * 递归查找指定key的field
 */
let _field_ = {};
export const queryFieldByName = (fields: any, fieldKey: string) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.key === fieldKey) {
      _field_ = field;
      break;
    } else if (
      field.type === 'FieldSet' &&
      Array.isArray(field.props.children)
    ) {
      // 递归子节点
      queryFieldByName(field.props.children, fieldKey);
    }
  }
  return _field_;
};
