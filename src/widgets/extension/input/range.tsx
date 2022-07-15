import { Space } from 'antd';
import InputNumber from '../../antd/input-number';
import './index.less';

export default ({ value, onChange, startProps, endProps, ...props }) => {
  return (
    <Space
      className={
        props.readOnly ? 'widget-range-input-readOnly' : 'widget-range-input'
      }
    >
      <InputNumber
        precision={2}
        placeholder="请输入"
        {...props}
        {...startProps}
        value={value?.[0]}
        onChange={(e) => {
          onChange([e, value?.[1]]);
        }}
      />
      <span>-</span>
      <InputNumber
        precision={2}
        placeholder="请输入"
        {...props}
        {...endProps}
        value={value?.[1]}
        onChange={(e) => {
          onChange([value?.[0], e]);
        }}
      />
    </Space>
  );
};
