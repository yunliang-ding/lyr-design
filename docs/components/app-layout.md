---
order: 25
title: AppLayout 应用布局
toc: menu
---

<Alert>

- 中后台应用外层壳子布局解决方法

</Alert>

## 基本使用

```tsx
import React from 'react';
import { AppLayout, Button } from 'react-core-form';
import { Space, Avatar, Input, Dropdown, Menu } from '@arco-design/web-react';
import { IconUser, IconMoon, IconSun } from '@arco-design/web-react/icon';
import menus from './schema/app-layout/schema';
import { generate, getRgbStr } from '@arco-design/color';
import './index.less';

export default () => {
  // 接入项目的时候，使用 AppLayout 内置的 listenHashChange 可监听 hash
  // useEffect(() => {
  //   const removeListener = layoutRef.current.listenHashChange(({ currentBreadcrumb }) => {
  //     /** 设置当前路由的默认面包屑 */
  //     breadcrumbDispatch.update(currentBreadcrumb);
  //   });
  //   return removeListener;
  // }, []);
  const [pathname, setPathName] = React.useState('/workbench/my');
  const [compact, setCompact] = React.useState(true);
  const [dark, setDark] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [pageHeaderProps, setPageHeaderProps] = React.useState({
    title: '我的工作台',
    breadcrumb: [
      {
        path: '/workbench',
        breadcrumbName: '工作台',
      },
      {
        path: '/workbench/my',
        breadcrumbName: '我的工作台',
      },
    ],
  });
  return (
    <AppLayout
      // layoutRef={layoutRef}
      waterMarkProps={{
        content: 'arco-water-mark',
        zIndex: 10,
        fontStyle: {
          color: dark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)',
          fontSize: 12,
        },
      }}
      compact={compact}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      dark={dark}
      pathname={pathname}
      pageHeaderProps={pageHeaderProps}
      // logo={
      //   <img
      //     src="https://react-core-form.oss-cn-beijing.aliyuncs.com/assets/favicon.ico"
      //     style={{
      //       width: 32,
      //       height: 32,
      //     }}
      //   />
      // }
      title="中后台通用模版"
      menu={{
        items: menus,
        onClick: ({ path, currentBreadcrumb }) => {
          // location.hash = path // 接入项目的时候，只需要这行代码，改变 hash 即可
          setPathName(path);
          setPageHeaderProps({
            ...currentBreadcrumb,
            // 扩展操作按钮
            extra: <Button type="primary">添加</Button>,
          });
        },
      }}
      footerRender={() => <div>这个是底部的说明</div>}
      siderFooterRender={(collapsed) =>
        collapsed ? null : <div>这个 sider 说明</div>
      }
      rightContentRender={() => {
        return (
          <div className="app-right-header">
            <Space>
              {dark ? (
                <IconSun
                  onClick={() => {
                    document.body.removeAttribute('arco-theme');
                    setDark(false);
                  }}
                />
              ) : (
                <IconMoon
                  onClick={() => {
                    document.body.setAttribute('arco-theme', 'dark');
                    setDark(true);
                  }}
                />
              )}
              <a
                onClick={() => {
                  setCompact(!compact);
                }}
              >
                切换模式
              </a>
              <Dropdown
                placement="bottom"
                droplist={
                  <Menu>
                    <Menu.Item>退出登录</Menu.Item>
                  </Menu>
                }
              >
                <a>Admin</a>
              </Dropdown>
              <Input
                type="color"
                defaultValue="#165dff"
                style={{ border: 'none', background: 'none', width: 45 }}
                onChange={(hex) => {
                  const newColor = hex;
                  const newList = generate(newColor, {
                    list: true,
                    dark,
                  });
                  newList.forEach((l, index) => {
                    const rgbStr = getRgbStr(l);
                    document.body.style.setProperty(
                      `--arcoblue-${index + 1}`,
                      rgbStr,
                    );
                  });
                }}
              />
              <Avatar
                style={{ backgroundColor: 'rgb(var(--primary-6))' }}
                size={26}
              >
                <IconUser />
              </Avatar>
            </Space>
          </div>
        );
      }}
    >
      内容区域
    </AppLayout>
  );
};
```

## API

<API src="../../src/app-layout/index.tsx" hideTitle></API>
