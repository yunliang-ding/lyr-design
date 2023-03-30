import { CodeEditor, CodeProps } from '../index';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';

export default ({
  value = '',
  onChange = () => {},
  style = { height: 300 },
  codeRef = useRef({}),
  ...rest
}: CodeProps) => {
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  useEffect(() => {
    Object.assign(codeRef.current, {
      getCssCode: async () => {
        if (window.less) {
          const { css } = await window.less.render(valueRef.current);
          return css;
        }
        console.error('请引入less.js后使用');
        return '';
      },
    });
  }, []);
  return (
    <CodeEditor
      minimapEnabled={false}
      {...rest}
      codeRef={codeRef}
      value={value}
      language="less"
      onChange={debounce((code: string) => {
        onChange(code);
        valueRef.current = code; // 同步文本
      }, 300)}
    />
  );
};
