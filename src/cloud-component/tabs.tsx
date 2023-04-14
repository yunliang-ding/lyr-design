import { Icon } from '..';

export default ({ component, setComponent }) => {
  return (
    <div className="cloud-component-tabs">
      {component.map((item) => {
        return (
          item.open && (
            <div
              onClick={() => {
                setComponent(
                  component.map((comp) => {
                    return {
                      ...comp,
                      selected: comp.componentName === item.componentName,
                    };
                  }),
                );
              }}
              className={
                item.selected
                  ? 'cloud-component-tabs-item-selected'
                  : 'cloud-component-tabs-item'
              }
              key={item.componentName}
            >
              <Icon type="react" color="#1890ff" />
              {item.componentName}
              <span
                className="close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  // 默认选中第一个打开的
                  const opens = component.filter(
                    (i) => i.open && i.componentName !== item.componentName,
                  );
                  if (item.selected && opens[0]) {
                    opens[0].selected = true;
                  }
                  item.open = false;
                  item.selected = false;
                  setComponent([...component]);
                }}
              >
                <Icon type="close" hover />
              </span>
            </div>
          )
        );
      })}
    </div>
  );
};
