/**
 * 自定义扩展业务组件
 */
import React, { useRef } from 'react';
import { babelParse, Button, CreateSpin } from '../index';
import Menus from './menus';
import Tabs from './tabs';
import Main, { injectStyle } from './main';
import { downloadFile } from 'react-core-form-tools';
import { message, Upload } from 'antd';
import ReactDOM from 'react-dom';
import './index.less';

const { open, close } = CreateSpin({
  getContainer: () => {
    return document.querySelector('.cloud-component-right');
  },
  style: {
    top: 40,
  },
  mode: 'vscode',
});

const CloudComponent = ({
  componentRef = useRef({}),
  require = {},
  onSave = async () => {},
  onChange = () => {},
  onAdd = async (code) => {},
  initialComponent = [],
  extra = [],
}: any) => {
  const currentRef = useRef({});
  const [component, setComponent]: any = React.useState(initialComponent);
  const runApi = async () => {
    const current = component.find((i) => i.selected);
    current?.runApi?.();
  };
  // Ctrl + S
  const keyboardEvent = async (e) => {
    if (
      (e.key === 's' || e.key === 'S') &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      runApi();
    }
  };
  React.useEffect(() => {
    runApi(); // 默认执行一次预览
    currentRef.current = component.find((i) => i.selected); // 更新选中节点
    // 添加api
    componentRef.current = {
      openSpin: open,
      closeSpin: close,
      component,
      setComponent,
      code: currentRef.current,
    };
    onChange();
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [component]);
  return (
    <div className="cloud-component">
      <Menus
        component={component}
        setComponent={setComponent}
        onAdd={onAdd}
        close={close}
        open={open}
      />
      <div className="cloud-component-right">
        {component.filter((i) => i.open).length === 0 ? (
          <img
            style={{ width: 300 }}
            className="cloud-component-right-empty"
            src="https://img.alicdn.com/imgextra/i1/O1CN01ypboF828fH2ScXohX_!!6000000007959-55-tps-40-40.svg"
          />
        ) : (
          <>
            <div className="cloud-component-right-header">
              <Tabs component={component} setComponent={setComponent} />
              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  spin
                  type="primary"
                  size="small"
                  onClick={async () => {
                    open();
                    await new Promise((res) => setTimeout(res, 500));
                    await onSave(currentRef.current, component);
                    close();
                  }}
                >
                  保存
                </Button>
                <Button spin type="primary" size="small" onClick={runApi}>
                  预览
                </Button>
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
                              console.log(jsonItem);
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
                    key={item.componentName}
                    require={require}
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
        ...require,
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
