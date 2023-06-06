import Icon from '@/icon';

export default ({ component, setComponent }) => {
  return (
    <div className="cloud-component-right-header">
      <div className="cloud-component-tabs">
        {component.map((item) => {
          return (
            item.open &&
            [
              {
                icon: <Icon size={16} type="file-markdown" color="#1890ff" />,
                name: item.componentName,
                content: item.react,
              },
            ].map((file) => {
              return (
                <div
                  className="cloud-component-tabs-item-selected"
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
    </div>
  );
};
