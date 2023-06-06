import Button from '@/button';
import Icon from '@/icon';
import { message, Upload } from 'antd';
import { downloadFile } from 'react-core-form-tools';

export default ({
  component,
  setComponent,
  selectedTab,
  setSelectedTab,
  onAdd,
  extra,
}) => {
  return (
    <div className="cloud-component-right-header">
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
                    setSelectedTab(file.name);
                  }}
                  className={
                    selectedTab === file.name
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
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          spin
          type="primary"
          size="small"
          onClick={async () => {
            const url = URL.createObjectURL(
              new Blob(JSON.stringify(component, null, 2).split('')),
            );
            await downloadFile(url, `${new Date().toLocaleTimeString()}.json`);
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
                const jsonArr = JSON.parse(await file.originFileObj.text());
                if (Array.isArray(jsonArr)) {
                  // 去重
                  jsonArr.forEach((jsonItem) => {
                    // 剔除部分属性
                    delete jsonItem.open;
                    delete jsonItem.selected;
                    if (
                      !component.some((comp) => {
                        return comp.componentName === jsonItem.componentName;
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
  );
};
