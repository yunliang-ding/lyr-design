import React from 'react';
import { Input } from '@arco-design/web-react';
/**
 * 计数器输入框
 */
export default ({
  showCount = true, // 默认开启
  allowCLear = true, // 默认支持清除
  maxLength = 64, // 默认64
  ...rest
}) => {
  // 渲染只读视图
  if (rest.readOnly) {
    return <span className="readonly-count-input">{rest.value}</span>;
  }
  const count = typeof rest.value === 'string' ? String(rest.value).length : 0;
  return (
    <Input
      suffix={
        showCount && (
          <span style={{ opacity: 0.6, fontSize: 12 }}>
            {count} / {maxLength}
          </span>
        )
      }
      maxLength={maxLength}
      {...rest}
    />
  );
};
