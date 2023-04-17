import { Icon } from '../index';
import { isEmpty } from 'react-core-form-tools';
import { useState } from 'react';
import Dependencies from './dependencies';

const reactStr = `import { Button } from 'antd';
   
export default (props) => {
  return <div className="{componentName}">
    <Button type='primary'>{props.name}</Button>
  </div>
}
 `;

const lessStr = `.{componentName}{
  button{
    font-size: 12px;
  }
}`;

export default ({
  component,
  setComponent,
  onAdd,
  close,
  open,
  dependencies,
  setDependencies,
  openDependencies,
  onAddDep,
  onUpdateDep,
}) => {
  const [err, setErr] = useState('');
  const rule = ({ target }) => {
    const { value } = target;
    if (/\s+/.test(value)) {
      setErr('文件名称不能包含空格');
    } else if (/[\u4E00-\u9FA5]/.test(value)) {
      setErr('文件名称不能有中文');
    } else if (/^\d+$/.test(value)) {
      setErr('文件名称不能以数字开头');
    } else if (
      component.some((comp) => comp.componentName === value && !isEmpty(value))
    ) {
      setErr('文件已存在');
    } else {
      setErr('');
    }
  };
  const addComponent = async (componentName: string, item, index) => {
    if (!isEmpty(componentName)) {
      item.componentName = componentName;
      delete item.state;
      item.react = reactStr.replaceAll('{componentName}', componentName);
      item.less = lessStr.replaceAll('{componentName}', componentName);
      item.props = {
        name: componentName,
      };
      // 自动选中到新增的这条
      component.forEach((i) => {
        i.selected = false;
        i.open = false; // 兼容bug, 改成单开模式
      });
      item.selected = true;
      item.open = true;
      open();
      try {
        item.id = await onAdd(item); // 获取id
      } catch (error) {
        console.log(error);
      } finally {
        close();
      }
    } else {
      component.splice(index, 1);
    }
    setComponent([...component]);
  };

  return (
    <div className="cloud-component-left">
      <div className="cloud-component-left-header">
        <span>组件列表</span>
        <Icon
          type="add"
          hover
          title="新增云组件"
          onClick={() => {
            if (component.some((i) => i.state === 'edit')) {
              return;
            }
            component.push({
              componentName: '',
              state: 'edit',
              props: {},
            });
            setComponent([...component]);
          }}
        />
      </div>
      <div className="cloud-component-left-body">
        {component.map((item, index) => {
          return (
            <div
              key={item.componentName}
              className={
                item.selected
                  ? 'cloud-component-left-body-item-selected'
                  : 'cloud-component-left-body-item'
              }
            >
              <span style={{ marginRight: 4, display: 'flex' }}>
                <Icon type="react" color="#1890ff" />
              </span>
              <span
                style={{ position: 'relative' }}
                className={err ? 'error-span' : ''}
              >
                {item.state === 'edit' ? (
                  <>
                    <input
                      onBlur={(e) => {
                        !err && addComponent(e.target.value, item, index);
                      }}
                      onChange={rule}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          !err && addComponent(e.target.value, item, index);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      autoFocus
                      defaultValue={item.componentName}
                      style={{
                        background: '#333',
                        border: 'none',
                        width: 'calc(100% + 28px)',
                        height: 18,
                        outline: '1px solid #1890ff',
                        color: '#fff',
                      }}
                    />
                    {item.state === 'edit' && (
                      <div className="cloud-component-left-body-input-error">
                        {err}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    style={{ width: 180 }}
                    onClick={async () => {
                      setComponent(
                        component.map((i: any) => {
                          return {
                            ...i,
                            open: i.componentName === item.componentName, // 兼容bug, 改成单开模式
                            // i.open ||
                            // i.componentName === item.componentName,
                            selected: i.componentName === item.componentName,
                          };
                        }),
                      );
                    }}
                  >
                    {item.componentName}
                  </div>
                )}
              </span>
            </div>
          );
        })}
      </div>
      <div className="cloud-component-left-footer">
        {openDependencies && (
          <Dependencies
            dependencies={dependencies}
            setDependencies={setDependencies}
            onAddDep={onAddDep}
            onUpdateDep={onUpdateDep}
          />
        )}
      </div>
    </div>
  );
};
