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
import { Space, Avatar, Dropdown, Menu } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import menus from './schema/app-layout/schema';
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
        content: '测试用户-123',
      }}
      compact={compact}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      dark={dark}
      pathname={pathname}
      pageHeaderProps={pageHeaderProps}
      logo={
        <img
          src="https://v2.ice.work/img/logo.png"
          style={{
            width: 32,
            height: 32,
          }}
        />
      }
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
              <a
                onClick={() => {
                  setDark(!dark);
                }}
              >
                切换主题
              </a>
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
              <Avatar style={{ backgroundColor: '#3370ff' }}>
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

<!-- <API src="../../src/app-layout/index.tsx" hideTitle></API> -->
