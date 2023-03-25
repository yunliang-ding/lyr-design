import { Button } from '../index';
import { isEmpty, uuid } from 'react-core-form-tools';

const reactStr = `import { Button } from 'antd';
   
 export default (props) => {
  return <div className="{componentName}">
    <Button type='primary'>{componentName}</Button>
  </div>
}
 `;

const lessStr = `.{componentName}{
  button{
    font-size: 12px;
  }
}`;

export default ({ component, setComponent }) => {
  const addComponent = (componentName: string, item, index) => {
    if (!isEmpty(componentName)) {
      item.componentName = componentName;
      const _name = `${componentName.toLowerCase()}-${uuid(6)}`;
      delete item.state;
      item.react = reactStr.replaceAll('{componentName}', _name);
      item.less = lessStr.replaceAll('{componentName}', _name);
      // 自动选中到新增的这条
      component.forEach((i) => {
        i.selected = false;
      });
      item.selected = true;
      item.open = true;
    } else {
      component.splice(index, 1);
    }
    setComponent([...component]);
  };

  return (
    <div className="cloud-component-left">
      <div className="cloud-component-left-header">
        <Button
          size="small"
          type="primary"
          onClick={() => {
            component.push({
              componentName: '',
              state: 'edit',
              props: {},
            });
            setComponent([...component]);
          }}
        >
          新增云组件
        </Button>
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
                <i className="iconfont spicon-React" />
              </span>
              <span>
                {item.state === 'edit' ? (
                  <input
                    onBlur={(e) => {
                      addComponent(e.target.value, item, index);
                    }}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        addComponent(e.target.value, item, index);
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
                      width: 'calc(100% + 30px)',
                      height: 18,
                      outline: '1px solid #1890ff',
                      color: '#fff',
                    }}
                  />
                ) : (
                  <div
                    style={{ width: 180 }}
                    onClick={async () => {
                      setComponent(
                        component.map((comp) => {
                          return {
                            ...comp,
                            open:
                              comp.open ||
                              comp.componentName === item.componentName,
                            selected: comp.componentName === item.componentName,
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
    </div>
  );
};
