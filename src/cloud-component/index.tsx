/**
 * 自定义扩展业务组件
 */
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import {
  MarkdownViewer,
  babelParse,
  babelParseCode,
  CreateSpin,
} from '../index';
import { Interpreter } from 'eval5';
import Main, { injectStyle } from './main';
import Menus from './menus';
import { MarkDownViewerProps } from '../markdown-viewer';
import './index.less';

const interpreter = new Interpreter(window);

const { open, close } = CreateSpin({
  getContainer: () => {
    return document.querySelector('.cloud-component-right');
  },
  style: {
    top: 40,
  },
  mode: 'vscode',
});

export interface CloudComponentProps {
  /** 实例引用 */
  componentRef?: any;
  /** 配置依赖 */
  require?: any;
  /** ctrl + s 钩子 */
  onSave?: any;
  /** onChange */
  onChange?: any;
  /** 新增钩子 */
  onAdd?: Function;
  /** 默认值 */
  initialComponent?: any[];
  /** 配置额外操作 */
  extra?: any[];
  /** 外部依赖 */
  initialDependencies?: any;
  onLog?: Function; // 加载日志
  /** 新增依赖 */
  onAddDep?: Function;
  /** 更新依赖 */
  onUpdateDep?: Function;
  /** 自定义预览 */
  previewRender?: any;
}

const CloudComponent = ({
  componentRef = useRef({}),
  require = {},
  onSave = async (code) => {},
  onAdd = async (code) => {},
  onAddDep = async (code) => {},
  onUpdateDep = async (version) => {},
  onChange = () => {},
  initialComponent = [],
  extra = [],
  initialDependencies = [],
  onLog = () => {},
  previewRender,
}: CloudComponentProps) => {
  const currentRef: any = useRef({});
  const [selectedTab, setSelectedTab]: any = useState('index.js'); // 默认选中index.js
  // 存储选中的tab
  useEffect(() => {
    currentRef.current.selectedTab = selectedTab;
  }, [selectedTab]);
  const [component, setComponent]: any = useState(initialComponent);
  const [dependencies, setDependencies]: any = useState(initialDependencies);
  const [_require, setRequire]: any = useState(require);
  const updateDepReq = async (dep) => {
    const _dep = {};
    for (let i = 0; i < dep.length; i++) {
      const item = dep[i];
      if (item.content) {
        // 使用 eval5 加载脚本
        try {
          onLog(`加载资源: ${item.name}`);
          if (item.type === 'javascript') {
            await interpreter.evaluate(
              babelParseCode({
                code: item.content,
              }),
            )();
            _dep[item.name] = window[item.name];
          } else if (item.type === 'react') {
            _dep[item.name] = babelParse({
              code: item.content,
            });
          } else if (item.type === 'less' && window.less) {
            const { css } = await window.less.render?.(item.content); // 要添加的 CSS 字符串
            const sheet = new CSSStyleSheet(); // 创建一个 CSSStyleSheet 对象
            sheet.insertRule(css, 0); // 将 CSS 规则插入到 CSS 样式表中，位置为第一个
            document.adoptedStyleSheets = [sheet];
          }
          onLog(`${item.name} 资源解析成功..`);
        } catch (error) {
          console.log(error);
          onLog(`${item.name} 资源解析失败..`);
        }
      }
    }
    onLog('加载完毕');
    // 更新依赖
    setRequire({
      ...require,
      ..._dep,
    });
  };
  // 加载依赖
  useEffect(() => {
    updateDepReq(dependencies);
  }, [dependencies]);
  // 保存
  const save = async () => {
    open();
    try {
      await new Promise((res) => setTimeout(res, 500));
      await onSave(
        component.find((i) => i.selected),
        _require,
      );
    } finally {
      close();
    }
  };
  // Ctrl + S
  const keyboardEvent = async (e) => {
    if (
      (e.key === 's' || e.key === 'S') &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      save();
    }
  };
  useEffect(() => {
    // 更新 ref Api
    componentRef.current = {
      openSpin: open,
      closeSpin: close,
      component,
      setComponent,
      code: component.find((i) => i.selected),
      tabs: currentRef.current,
    };
    onChange();
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [component, _require]);
  return (
    <div className="cloud-component">
      <Menus
        component={component}
        setComponent={setComponent}
        onAdd={onAdd}
        close={close}
        open={open}
        dependencies={dependencies}
        setDependencies={setDependencies}
        onAddDep={onAddDep}
        onUpdateDep={onUpdateDep}
      />
      <div className="cloud-component-right">
        {component.filter((i) => i.open).length === 0 ? (
          <img
            style={{ width: 200 }}
            className="cloud-component-right-empty"
            src="https://img.alicdn.com/imgextra/i1/O1CN01ypboF828fH2ScXohX_!!6000000007959-55-tps-40-40.svg"
          />
        ) : (
          <>
            {component.map((item) => {
              return (
                item.open && (
                  <Main
                    item={item}
                    extra={extra}
                    onAdd={onAdd}
                    component={component}
                    setComponent={setComponent}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    key={[
                      item.componentName,
                      ...Object.keys(_require),
                    ].toString()}
                    require={_require}
                    previewRender={previewRender}
                  />
                )
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

/** 解析 React */

CloudComponent.parseReact = ({
  componentName,
  react = 'export default () => null',
  less = '{}',
  require = {},
}) => {
  return babelParse({
    require: {
      ...require,
      injectStyle,
    },
    code: `${react} \n;
     // 这里开始注入css样式
     require('injectStyle')('${componentName}', \`${less}\`);`,
  });
};

/** 解析 markdown */
CloudComponent.parseMarkdown = async (props: MarkDownViewerProps) => {
  return () => {
    return <MarkdownViewer {...props} />;
  };
};

/** 组件渲染 */
CloudComponent.render = (Comp, root) => {
  ReactDOM.render(Comp, root);
};

export default CloudComponent;
