/**
 * 自定义扩展业务组件
 */
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { babelParse, babelParseCode, Button, CreateSpin } from '../index';
import Menus from './menus';
import Tabs from './tabs';
import Main, { injectStyle } from './main';
import { downloadFile } from 'react-core-form-tools';
import { message, Upload } from 'antd';
import { Interpreter } from 'eval5';
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
  const [selectedTab, setSelectedTab]: any = useState('index.js'); // 默认选中index.js
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
            <div className="cloud-component-right-header">
              <Tabs
                component={component}
                setComponent={setComponent}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  spin
                  type="primary"
                  size="small"
                  onClick={async () => {
                    const url = URL.createObjectURL(
                      new Blob(JSON.stringify(component, null, 2).split('')),
                    );
                    await downloadFile(
                      url,
                      `${new Date().toLocaleTimeString()}.json`,
                    );
                  }}
                >
                  导出
                </Button>
                <Upload
                  accept=".json"
                  itemRender={() => null}
                  onChange={async ({ file }) => {
                    if (file.status === 'done') {
                      open();
                      await new Promise((res) => setTimeout(res, 1000));
                      try {
                        const jsonArr = JSON.parse(
                          await file.originFileObj.text(),
                        );
                        if (Array.isArray(jsonArr)) {
                          // 去重
                          jsonArr.forEach((jsonItem) => {
                            // 剔除部分属性
                            delete jsonItem.open;
                            delete jsonItem.selected;
                            if (
                              !component.some((comp) => {
                                return (
                                  comp.componentName === jsonItem.componentName
                                );
                              })
                            ) {
                              onAdd(jsonItem);
                              component.push(jsonItem);
                            }
                          });
                          setComponent([...component]);
                        } else {
                          message.warning('导入失败');
                        }
                      } catch (err) {
                        message.warning(err);
                      } finally {
                        close();
                      }
                    }
                  }}
                >
                  <Button type="primary" size="small">
                    导入
                  </Button>
                </Upload>
                {extra}
              </div>
            </div>
            {component.map((item) => {
              return (
                item.open && (
                  <Main
                    item={item}
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

CloudComponent.parse = (
  params: any = {
    codes: [],
    less: window.less,
    require: {},
  },
) => {
  const components = {};
  params.codes.forEach((code) => {
    components[code.componentName] = babelParse({
      require: {
        ...params.require,
        injectStyle,
      },
      code: `
      ${code.react} \n;
      // 这里开始注入css样式
      require('injectStyle')('${code.componentName}', \`${code.less}\`, ${params.less});
`,
    });
  });
  return components;
};

/** 组件渲染 */
CloudComponent.render = (Comp, root) => {
  ReactDOM.render(Comp, root);
};

export default CloudComponent;
