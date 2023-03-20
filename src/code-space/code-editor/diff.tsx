import { useEffect } from 'react';
import './index.less';

export interface MonacoDiffProps {
  id?: string;
  value: string;
  originalValue?: string;
  language?: string;
}

export default ({
  id = 'monaco-container-diff',
  value = '',
  originalValue = '',
  language = 'javascript',
  style = {},
  ...rest
}: any) => {
  // 加载资源
  const initialLoad = async () => {
    const _require: any = window.require;
    if (_require) {
      _require.config({
        paths: {
          vs: 'https://g.alicdn.com/code/lib/monaco-editor/0.36.0/min/vs',
        },
      });
      return new Promise(() => {
        _require(['vs/editor/editor.main'], () => {
          const diffEditor = window.monaco.editor.createDiffEditor(
            document.getElementById(id),
            {
              theme: 'vs-dark',
              selectOnLineNumbers: true,
              automaticLayout: true,
              readOnly: true,
              renderSideBySide: true,
              fontSize: 14,
              fontWeight: '500',
              minimap: {
                enabled: false,
              },
              ...rest,
            },
          );
          const originalModel = window.monaco.editor.createModel(
            originalValue,
            language,
          );
          const modifiedModal = window.monaco.editor.createModel(
            value,
            language,
          );
          diffEditor.setModel({
            original: originalModel,
            modified: modifiedModal,
          });
        });
      });
    }
  };
  useEffect(() => {
    initialLoad();
  }, []);
  return <div id={id} style={style} className="app-code-editor-diff" />;
};
