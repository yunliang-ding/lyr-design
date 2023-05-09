import { Icon } from '..';

export default ({ component, setComponent }) => {
  return (
    <div className="cloud-component-tabs">
      {component.map((item) => {
        return (
          item.open &&
          [
            {
              icon: <Icon size={14} type="file-javascript" color="#f4ea2a" />,
              name: 'index.js',
              content: item.react,
            },
            {
              icon: <Icon type="file-css" color="#1890ff" />,
              name: 'index.less',
              content: item.less,
            },
            {
              icon: <Icon type="file-css" color="#f4ea2a" />,
              name: 'props.json',
              content: item.meta,
            },
          ].map((file) => {
            return (
              <div
                onClick={() => {
                  setComponent(
                    component.map((comp) => {
                      return {
                        ...comp,
                        selected: comp.componentName === item.componentName,
                        selectedTab: file.name,
                      };
                    }),
                  );
                }}
                className={
                  item.selectedTab === file.name
                    ? 'cloud-component-tabs-item-selected'
                    : 'cloud-component-tabs-item'
                }
                key={file.name}
              >
                {file.icon}
                {file.name}
                <span
                  className="close-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 关闭之后默认选中第一个打开的
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
            );
          })
        );
      })}
    </div>
  );
};
