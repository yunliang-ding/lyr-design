import { uuid } from '@/util';
import { useEffect, useRef, CSSProperties, memo } from 'react';
import FunctionEditor from './function-editor';
import JsonEditor from './json-editor';
import Diff from './diff';
import LessEditor from './less-editor';
import { textMateService } from './syntaxHighlighter';
import './index.less';

export interface CodeProps {
  id?: string;
  /**
   * 语言设置
   * @default javascript
   */
  language?: string;
  /**
   * 默认值
   */
  value?: string;
  /**
   * 主题
   * @default vs-dark
   */
  theme?: 'vs-dark' | 'vs';
  /**
   * 是否展示小地图
   * @default true
   */
  minimapEnabled?: boolean;
  /** 容器样式 */
  style?: CSSProperties;
  /** onChange 钩子 */
  onChange?: Function;
  /** ctrl + s 钩子 */
  onSave?: Function;
  /** CodeEditor 实例引用 */
  codeRef?: any;
  /** 模式 */
  mode?: 'json' | 'function' | 'less' | 'diff';
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
  /** 配置第三方依赖 */
  require?: any;
  /**
   * 设置防抖时间(ms)
   * @default 300
   */
  debounceTime?: number;
  /**
   * 是否需要加盐
   * @default false
   */
  useEncrypt?: boolean;
  originalValue?: string;
}
/**
 * 编辑器
 */
export const CodeEditor = memo(
  ({
    id = `monaco_${uuid(8)}`,
    value = '',
    onChange = () => {},
    style = {},
    onSave,
    language = 'javascript',
    theme = 'vs-dark',
    codeRef = useRef<any>({}),
    minimapEnabled = true,
    ...rest
  }: CodeProps) => {
    // 加载资源
    const oldDecorationsRef = useRef({});
    const initialLoad = async () => {
      const _require: any = window.require;
      if (_require) {
        _require.config({
          paths: {
            vs: 'https://g.alicdn.com/code/lib/monaco-editor/0.36.0/min/vs',
          },
        });
        return new Promise((res) => {
          _require(['vs/editor/editor.main'], () => {
            const monaco: any = window.monaco;
            const codeInstance = monaco.editor.create(
              document.getElementById(id),
              {
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
              },
            );
            if (typeof onSave === 'function') {
              // ctrl + s 执行 onSave
              codeInstance.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                () => {
                  const code = codeInstance.getValue();
                  onSave(code);
                },
              );
            }
            // onChange
            codeInstance.onDidChangeModelContent((e) => {
              const code = codeInstance.getValue();
              if (['javascript', 'typescript'].includes(language)) {
                oldDecorationsRef.current = codeInstance.deltaDecorations(
                  oldDecorationsRef.current,
                  textMateService(code),
                );
              }
              if (!e.isFlush) {
                onChange(code);
              }
            });
            res(codeInstance);
          });
        });
      }
    };
    useEffect(() => {
      const monacoInstance = initialLoad();
      //  同步 window
      monacoInstance.then((res) => {
        window[id] = res;
      });
      // 挂到ref
      codeRef.current.getMonacoInstance = async () => {
        return monacoInstance;
      };
    }, []);
    // 更新值
    useEffect(() => {
      codeRef.current.getMonacoInstance().then((instance) => {
        if (!instance.hasTextFocus()) {
          instance.setValue(value);
        }
      });
    }, [value]);
    return <div id={id} className="app-code-editor" style={style} />;
  },
);

export default ({ mode, ...props }: CodeProps) => {
  if (mode === 'json') {
    return <JsonEditor {...props} />;
  }
  if (mode === 'function') {
    return <FunctionEditor {...props} />;
  }
  if (mode === 'less') {
    return <LessEditor {...props} />;
  }
  if (mode === 'diff') {
    return <Diff {...props} />;
  }
  return <CodeEditor {...props} />;
};
