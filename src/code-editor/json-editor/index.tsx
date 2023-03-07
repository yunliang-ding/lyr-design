import { CodeEditor, CodeProps } from '../index';
import { debounce } from 'lodash';
import { memo, useState } from 'react';
import './index.less';

export default ({
  value,
  onChange,
  style = { height: 300 },
  ...rest
}: CodeProps) => {
  const [errorInfo, setErrorInfo] = useState('');
  return (
    <div className="json_data_box" style={style}>
      {errorInfo && <div className="json_data_error_info">{errorInfo}</div>}
      <MemoCode
        {...rest}
        value={value}
        onChange={onChange}
        setErrorInfo={setErrorInfo}
      />
    </div>
  );
};

const MemoCode = memo(
  ({ value, onChange, setErrorInfo, ...rest }: any) => {
    return (
      <CodeEditor
        minimapEnabled={false}
        {...rest}
        value={JSON.stringify(value, null, 2)}
        language="json"
        onChange={debounce((code: string) => {
          try {
            const options = JSON.parse(code.replaceAll?.('\n', ''));
            onChange(options);
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(error.toString());
          }
        }, 300)}
      />
    );
  },
  () => {
    return true;
  },
);
