import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloudComponent, CodeEditor } from '../../../index';
import { uuid } from 'react-core-form-tools';
import Tabs from './tabs';

const Container = ({ item, previewRender }) => {
  const previewId = React.useMemo(() => `preview-${uuid(6)}`, []);
  const codeRef1: any = React.useRef({});
  const runApi = async () => {
    if (typeof previewRender !== 'function') {
      const VDom: any = await CloudComponent.parseMarkdown(item.react);
      ReactDOM.render(<VDom />, document.querySelector(`#${previewId}`)); // 预览
    }
  };
  useEffect(() => {
    runApi();
  }, []);
  return (
    <div
      className="cloud-component-right-body"
      style={{
        display: item.selected ? 'flex' : 'none',
      }}
    >
      <div className="cloud-component-right-body-react">
        <CodeEditor
          language="markdown"
          codeRef={codeRef1}
          value={item.react}
          onChange={(code) => {
            item.react = code;
            runApi();
          }}
        />
      </div>
      {typeof previewRender === 'function' ? (
        previewRender(item)
      ) : (
        <div className="cloud-component-right-body-preview" id={previewId} />
      )}
    </div>
  );
};

export default (props) => {
  return (
    <>
      <Tabs {...props} />
      <Container {...props} />
    </>
  );
};
