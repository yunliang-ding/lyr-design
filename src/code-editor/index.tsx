import { uuid } from '@/util';
import { useEffect, useRef, CSSProperties } from 'react';
import FunctionEditor from './function-editor';
import JsonEditor from './json-editor';
import './index.less';

export interface CodeProps {
  id?: string;
  /** 语言设置 */
  language?: string;
  /** 默认值 */
  value: string;
  /** 主题 */
  theme?: 'vs-dark' | 'vs';
  /** 是否展示小地图 */
  minimapEnabled?: Boolean;
  /** 容器样式 */
  style?: CSSProperties;
  /** onChange 钩子 */
  onChange?: Function;
  /** ctrl + s 钩子 */
  onSave?: Function;
  /** code 实例引用 */
  codeRef?: any;
  /** 使用 json 模式，或者 函数模式 */
  mode?: 'json' | 'function';
}
/**
 * 编辑器
 */
export default ({ mode, ...props }: CodeProps) => {
  const {
    id = `code-container-${uuid(8)}`,
    value = '',
    onChange = () => {},
    onSave = () => {},
    style = {},
    language = 'javascript',
    theme = 'vs-dark',
    codeRef = useRef<any>({}),
    minimapEnabled = true,
    ...rest
  } = props;
  if (mode === 'json') {
    return <JsonEditor {...props} />;
  }
  if (mode === 'function') {
    return <FunctionEditor {...props} />;
  }
  // 加载资源
  useEffect(() => {
    const _require: any = (window as any).require;
    if (_require) {
      _require.config({
        paths: {
          vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.36.0/min/vs',
        },
      });
      _require(['vs/editor/editor.main'], () => {
        const _code: any = (window as any).monaco;
        const codeInstance = _code.editor.create(document.getElementById(id), {
          language,
          selectOnLineNumbers: true,
          automaticLayout: true,
          tabSize: 2,
          fontSize: 14,
          theme,
          fontWeight: '400',
          minimap: {
            enabled: minimapEnabled,
          },
          value,
          ...rest,
        });
        // ctrl + s 执行 onSave
        codeInstance.addCommand(
          _code.KeyMod.CtrlCmd | _code.KeyCode.KeyS,
          () => {
            const code = codeInstance.getValue();
            onSave(code);
          },
        );
        // onChange
        codeInstance.onDidChangeModelContent((e) => {
          const code = codeInstance.getValue();
          if (!e.isFlush) {
            onChange(code);
          }
        });
        codeRef.current = codeInstance; // 挂到ref
      });
    }
  }, []);
  return <div id={id} className="app-code-editor" style={style} />;
};
