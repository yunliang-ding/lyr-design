/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-bitwise */
import { uuid } from '@/util';
import { useEffect, useRef, CSSProperties, memo } from 'react';
import FunctionEditor from './function-editor';
import JsonEditor from './json-editor';
import Diff from './diff';
import LessEditor from './less-editor';
import { textMateService } from './syntaxHighlighter';
import loader from '@monaco-editor/loader';
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
  /** codeEditor 实例引用 */
  codeRef?: any;
  /** 使用 json 模式、函数模式、对比模式 */
  mode?: 'json' | 'function' | 'diff' | 'less';
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
  /**
   * 是否禁用
   * @default false
   */
  readOnly?: boolean;
  /** cdnPath 地址
   * @default https://g.alicdn.com/code/lib/monaco-editor/0.36.0/min/vs
   */
  cdnPath?: string;
}
/**
 * 编辑器
 */
export const CodeEditor = memo(
  ({
    id = `monaco_${uuid(8)}`,
    value = '',
    onChange = () => {},
    onSave,
    style = {},
    language = 'javascript',
    theme = 'vs-dark',
    codeRef = useRef<any>({}),
    minimapEnabled = true,
    cdnPath = 'https://g.alicdn.com/code/lib/monaco-editor/0.36.1/min/vs', // '/monaco/min/vs',
    ...rest
  }: CodeProps) => {
    const oldDecorationsRef = useRef({});
    /** 创建实例 */
    const createInstance = (monaco: any) => {
      const codeInstance = monaco.editor.create(document.getElementById(id), {
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
      // Format With Prettier
      if (window.prettier && ['javascript', 'typescript'].includes(language)) {
        codeInstance.addAction({
          id: 'MyPrettierFormat',
          label: 'Format With Prettier',
          contextMenuGroupId: 'navigation',
          contextMenuOrder: 8,
          run: (editor) => {
            try {
              const code = window.prettier.format(
                codeInstance
                  .getValue()
                  .replaceAll('\\n', '\n')
                  .replaceAll('\\', ''),
                {
                  parser: 'typescript',
                  plugins: window.prettierPlugins,
                },
              );
              editor.setValue(code);
              onChange?.(code);
            } catch (error) {
              console.log('Format With Prettier Error', error);
            }
          },
        });
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
      return codeInstance;
    };
    // 加载资源
    const initialLoad = async () => {
      // 配置资源CDN
      loader.config({
        paths: {
          vs: cdnPath,
        },
      });
      return new Promise((res) => {
        loader.init().then((monaco) => {
          if (typeof window.define === 'function' && window.define.amd) {
            // make monaco-editor's loader work with webpack's umd loader
            // @see https://github.com/microsoft/monaco-editor/issues/2283
            delete window.define.amd;
          }
          res(createInstance(monaco));
        });
      });
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
        if (instance) {
          if (!instance.hasTextFocus?.()) {
            instance.setValue?.(value);
          }
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
