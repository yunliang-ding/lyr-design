import { useMemo } from 'react';
import InputNumber from '../../arco-design/input-number';
import Input from '../../arco-design/input';
import { Space } from '@arco-design/web-react';
import './index.less';

export default ({
  value,
  onChange,
  startProps,
  endProps,
  mode = 'InputNumber',
  ...props
}) => {
  const onInnerBlur = (start, end) => {
    if (start && end && end < start) {
      onChange([end, start]);
    }
  };
  const Component = useMemo(() => {
    return mode === 'InputNumber' ? InputNumber : Input;
  }, []);
  return (
    <Space
      className={
        props.readOnly ? 'widget-range-input-readOnly' : 'widget-range-input'
      }
    >
      <Component
        precision={mode === 'InputNumber' ? 2 : undefined}
        placeholder="请输入"
        {...props}
        {...startProps}
        value={value?.[0]}
        onChange={(v) => {
          onChange?.([v, value?.[1]]);
        }}
        onBlur={(v) => {
          if (mode === 'InputNumber') {
            onInnerBlur(v, value?.[1]);
          }
        }}
      />
      <span>-</span>
      <Component
        precision={mode === 'InputNumber' ? 2 : undefined}
        placeholder="请输入"
        {...props}
        {...endProps}
        value={value?.[1]}
        onChange={(e) => {
          const v = typeof e === 'object' ? e.target.value : e;
          onChange?.([value?.[0], v]);
        }}
        onBlur={(e) => {
          if (mode === 'InputNumber') {
            onInnerBlur(value?.[0], e.target?.value);
          }
        }}
      />
    </Space>
  );
};
