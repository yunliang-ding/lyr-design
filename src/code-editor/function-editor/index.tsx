/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import { CodeEditor, CodeProps } from '../index';
import { debounce, isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { babelParse, decrypt, encrypt } from '../../index';
import './index.less';

export default ({
  value,
  onChange = () => {},
  style = { height: 300, width: 360 },
  defaultCode = '() => {}',
  noChangeClearCode = false,
  codeRef = useRef({}),
  require,
  useEncrypt = false,
  debounceTime = 300,
  ...rest
}: CodeProps) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const valueRef = useRef(value);
  useEffect(() => {
    Object.assign(codeRef.current, {
      getModuleDefault: () => {
        return babelParse({
          code: decrypt(valueRef.current, false), // 解码
          require,
        });
      },
      getModule: () => {
        return babelParse({
          code: decrypt(valueRef.current, false), // 解码
          exportDefault: false,
          require,
        });
      },
    });
  }, []);
  return (
    <div
      className={fullScreen ? 'function_data_box_full' : 'function_data_box'}
      style={style}
    >
      {errorInfo && <div className="function_data_error_info">{errorInfo}</div>}
      <div className="function_data_box_full_screen">
        <i
          className={
            fullScreen
              ? 'iconfont spicon-fullscreen-exit'
              : 'iconfont spicon-fullscreen'
          }
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        />
      </div>
      <CodeEditor
        value={decrypt(value, false) || defaultCode}
        minimapEnabled={false}
        {...rest}
        language="javascript"
        codeRef={codeRef}
        onChange={debounce(async (codeString) => {
          try {
            if (
              isEmpty(codeString) ||
              (codeString === defaultCode && noChangeClearCode)
            ) {
              setErrorInfo('');
              return onChange(undefined);
            }
            await new Promise((res) => setTimeout(res, 1000));
            babelParse({
              code: codeString,
              require,
            });
            onChange(useEncrypt ? encrypt(codeString) : codeString);
            valueRef.current = codeString; // 同步文本
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(error.toString());
          }
        }, debounceTime)}
      />
    </div>
  );
};
