/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import CodeEditor, { CodeProps } from '../index';
import { babelParse } from '../tools';
import { debounce, isEmpty } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import './index.less';

/** 函数加盐 */
export const encrypt = (str: string) => {
  return `{{_#${str}_#}}`;
};
/** 函数去盐 */
export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str?.replaceAll('"{{_#', '').replaceAll('_#}}"', '');
  }
  return str?.replaceAll('{{_#', '').replaceAll('_#}}', '');
};

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
      <MemoCode
        {...rest}
        value={value}
        codeRef={codeRef}
        onChange={(v) => {
          valueRef.current = v; // 同步文本
          onChange(v);
        }}
        useEncrypt={useEncrypt}
        setErrorInfo={setErrorInfo}
        defaultCode={defaultCode}
        noChangeClearCode={noChangeClearCode}
        require={require}
        debounceTime={debounceTime}
      />
    </div>
  );
};

const MemoCode = memo(
  ({
    value,
    onChange,
    setErrorInfo,
    defaultCode,
    noChangeClearCode,
    require,
    debounceTime,
    useEncrypt,
    codeRef,
    ...rest
  }: any) => {
    return (
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
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(error.toString());
          }
        }, debounceTime)}
      />
    );
  },
  () => {
    return true;
  },
);
