/**
 * 自定义扩展业务组件
 */
import React from 'react';
import { babelParse, Button, CreateSpin } from 'react-core-form';
import Menus from './menus';
import Tabs from './tabs';
import Main from './main';
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
  onSave = async (code) => {},
  initialComponent = [],
}) => {
  const [component, setComponent]: any = React.useState(initialComponent);
  const runApi = async () => {
    const current = component.find((i) => i.selected);
    current?.runApi();
  };
  return (
    <div className="cloud-component">
      <Menus component={component} setComponent={setComponent} />
      <div className="cloud-component-right">
        {component.filter((i) => i.open).length === 0 ? (
          <img
            style={{ width: 300 }}
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
                    await onSave(component);
                    close();
                  }}
                >
                  保存
                </Button>
                <Button spin type="primary" size="small" onClick={runApi}>
                  预览
                </Button>
                <Button spin type="primary" size="small">
                  导出
                </Button>
                <Button spin type="primary" size="small">
                  导入
                </Button>
              </div>
            </div>
            {component.map((item) => {
              return item.open && <Main item={item} key={item.componentName} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

const parseCodeToReactComponent = (codes: any[]) => {
  const components = {};
  codes.forEach((code) => {
    components[code.componentName] = babelParse({
      code: code.react,
    });
  });
  return components;
};

CloudComponent.parseCodeToReactComponent = parseCodeToReactComponent;

export default CloudComponent;
