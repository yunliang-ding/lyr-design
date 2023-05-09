import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { babelParse, CodeEditor } from '../index';
import { uuid } from 'react-core-form-tools';

export const injectStyle = async (
  id: string,
  lessCode: string,
  less = window.less,
) => {
  const { css } = await less.render(lessCode);
  const styleTag = document.querySelector(`style[id=${id}]`);
  if (styleTag) {
    styleTag.innerHTML = css;
  } else {
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = css;
    document.querySelector('head')?.appendChild(style);
  }
};

export const injectScript = async (src: string, name) => {
  return new Promise((res) => {
    if (document.querySelector(`script[class=${name}]`)) {
      res(true); // 存在直接返回
    } else {
      const script = document.createElement('script');
      script.src = src;
      script.className = name;
      document.querySelector('head')?.appendChild(script);
      script.onload = () => {
        res(true);
      };
    }
  });
};

export default ({ selectedTab, item, require, previewRender }) => {
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
        injectStyle(item.componentName, item.less); // 添加组件的style
        const props = codeRef3.current.getJson2Object(); // 注入props
        const VDom = babelParse({
          code: item.react,
          require: requireRef.current,
        }); // 得到组件
        ReactDOM.render(
          <VDom {...props} />,
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
            console.log(item);
            item.react = code;
            console.log(item);
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
