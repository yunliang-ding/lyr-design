import React from 'react';
import ReactDOM from 'react-dom';
import { CodeEditor } from '../index';
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

export default ({ item, require }) => {
  const previewId = React.useMemo(() => `preview-${uuid(6)}`, []);
  const codeRef1: any = React.useRef({});
  const codeRef2: any = React.useRef({});
  const codeRef3: any = React.useRef({});
  React.useEffect(() => {
    item.runApi = async () => {
      const VDom = codeRef1.current.getModuleDefault(); // 得到组件
      injectStyle(item.componentName, item.less); // 添加组件的style
      const props = codeRef3.current.getJson2Object(); // 注入props
      try {
        ReactDOM.render(
          <VDom {...props} />,
          document.querySelector(`#${previewId}`),
        ); // 预览
      } catch (error) {
        // 错误信息展示
        ReactDOM.render(
          <pre style={{ color: 'red' }}>{error.toString()}</pre>,
          document.querySelector('.cloud-component-right-body-preview'),
        );
      }
    };
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
          mode="function"
          require={require}
          codeRef={codeRef1}
          value={item.react}
          onChange={(code) => {
            item.react = code;
          }}
        />
      </div>
      <div className="cloud-component-right-body-preview" id={previewId} />
      <div className="cloud-component-right-body-less">
        <CodeEditor
          mode="less"
          value={item.less}
          codeRef={codeRef2}
          onChange={(code) => {
            item.less = code;
          }}
        />
      </div>
      <div className="cloud-component-right-body-props">
        <CodeEditor
          mode="json"
          value={item.props}
          codeRef={codeRef3}
          onChange={() => {
            item.props = codeRef3.current.getJson2Object();
          }}
        />
      </div>
    </div>
  );
};
