/* eslint-disable no-bitwise */
import { useEffect } from 'react';
import loader from '@monaco-editor/loader';
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
  useEffect(() => {
    // 配置资源CDN
    loader.config({
      paths: {
        vs: rest.cdnPath,
      },
    });
    loader.init().then((monaco) => {
      const diffEditor = monaco.editor.createDiffEditor(
        document.getElementById(id),
        {
          theme: 'vs-dark',
          selectOnLineNumbers: true,
          automaticLayout: true,
          readOnly: true,
          renderSideBySide: true,
          scrollBeyondLastLine: false,
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
      const modifiedModal = window.monaco.editor.createModel(value, language);
      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModal,
      });
    });
  }, []);
  return <div id={id} style={style} className="app-code-editor-diff" />;
};
