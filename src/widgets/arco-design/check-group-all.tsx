import { Checkbox, Space } from '@arco-design/web-react';
import { useState } from 'react';

export default ({ showCheckAll, ...props }) => {
  const [indeterminate, setIndeterminate] = useState(
    !!props.value?.length && props.value?.length < props.options.length,
  );
  const [checkAll, setCheckAll] = useState(
    !!props.value?.length && props.value?.length === props.options.length,
  );
  const onChange = (list: []) => {
    setIndeterminate(!!list.length && list.length < props.options.length);
    setCheckAll(list.length === props.options.length);
    // 通知外面
    props.onChange?.(list);
  };
  const onCheckAllChange = (checked) => {
    setIndeterminate(false);
    setCheckAll(checked);
    if (checked) {
      props.onChange?.(props.options.map((i) => i.value)); // 全部选择
    } else {
      props.onChange?.([]); // 全部清空
    }
  };
  return (
    <Space direction="vertical">
      <div className="core-form-check-group-all">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          {typeof showCheckAll === 'object'
            ? showCheckAll.text || '全选'
            : '全选'}
        </Checkbox>
      </div>
      <Checkbox.Group {...props} onChange={onChange} />
    </Space>
  );
};
