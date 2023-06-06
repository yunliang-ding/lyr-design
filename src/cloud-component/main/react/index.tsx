import ReactDOM from 'react-dom';
import { uuid } from 'react-core-form-tools';
import React, { useEffect, useRef } from 'react';
import { CloudComponent, CodeEditor } from '../../../index';
import Tabs from './tabs';

const Container = ({ selectedTab, item, require, previewRender }) => {
  // 处理在原生事件中获取不到 state 问题
  const requireRef = useRef(require);
  useEffect(() => {
    requireRef.current = require;
  }, [require]);
  const previewId = React.useMemo(() => `preview-${uuid(6)}`, []);
  const codeRef1: any = React.useRef({});
  const codeRef2: any = React.useRef({});
  const codeRef3: any = React.useRef({});
  const runApi = async () => {
    if (typeof previewRender !== 'function') {
      try {
        // 得到React组件
        const VDom = await CloudComponent.parseReact({
          react: item.react,
          less: item.less,
          require: requireRef.current,
          componentName: item.componentName,
        });
        ReactDOM.render(
          // 注入props
          <VDom {...codeRef3.current.getJson2Object()} />,
          document.querySelector(`#${previewId}`),
        ); // 预览
      } catch (error) {
        // 错误信息展示
        ReactDOM.render(
          <pre style={{ color: 'red' }}>{error.toString()}</pre>,
          document.querySelector(`#${previewId}`),
        );
      }
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
      <div
        style={{ display: selectedTab === 'index.js' ? 'block' : 'none' }}
        className="cloud-component-right-body-react"
      >
        <CodeEditor
          mode="function"
          require={require}
          codeRef={codeRef1}
          value={item.react}
          onChange={(code) => {
            item.react = code;
            runApi();
          }}
        />
      </div>

      <div
        style={{
          display: selectedTab === 'index.less' ? 'block' : 'none',
        }}
        className="cloud-component-right-body-less"
      >
        <CodeEditor
          mode="less"
          value={item.less}
          codeRef={codeRef2}
          onChange={(code) => {
            item.less = code;
            runApi();
          }}
        />
      </div>
      <div
        style={{
          display: selectedTab === 'props.json' ? 'block' : 'none',
        }}
        className="cloud-component-right-body-props"
      >
        <CodeEditor
          mode="json"
          value={item.props}
          codeRef={codeRef3}
          onChange={() => {
            item.props = codeRef3.current.getJson2Object();
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
