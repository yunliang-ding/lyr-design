/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import CodeEditor, { CodeProps } from '../index';
import { babelParse } from '../tools';
import { debounce, isEmpty } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import './index.less';

interface FunctionEditorProps extends CodeProps {
  /**
   * 默认代码段
   * @default () => {}
   */
  defaultCode?: string;
  /**
   * 没有改变代码自动设置为 undefined
   * @default false
   */
  noChangeClearCode?: boolean;
  /** ref 引用 */
  functionRef?: any;
  /** 配置第三方依赖 */
  require?: any;
  /**
   * 设置防抖时间(ms)
   * @default 300
   */
  debounceTime?: number;
}
export default ({
  value,
  onChange = () => {},
  style = { height: 300, width: 360 },
  defaultCode = '() => {}',
  noChangeClearCode = false,
  functionRef = useRef({}),
  require,
  debounceTime = 300,
}: FunctionEditorProps) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const valueRef = useRef(value);
  useEffect(() => {
    functionRef.current = {
      getModuleDefault: () => {
        return babelParse({
          code: valueRef.current,
          require,
        });
      },
      getModule: () => {
        return babelParse({
          code: valueRef.current, // 解码
          exportDefault: false,
          require,
        });
      },
    };
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
        value={value}
        onChange={(v) => {
          valueRef.current = v; // 同步文本
          onChange(v);
        }}
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
  }: any) => {
    const codeRef: any = useRef({});
    return (
      <CodeEditor
        value={value || defaultCode}
        codeRef={codeRef}
        minimapEnabled={false}
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
            onChange(codeString);
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
