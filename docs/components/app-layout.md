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
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { AppLayout } from 'react-core-form';
import menus from './schema/app-layout/schema';

export default () => {
  // 接入项目的时候，使用 AppLayout 内置的 listenHashChange 可监听 hash
  // useEffect(() => {
  //   const removeListener = layoutRef.current.listenHashChange(({ currentBreadcrumb }) => {
  //     /** 设置当前路由的默认面包屑 */
  //     breadcrumbDispatch.update(currentBreadcrumb);
  //   });
  //   return removeListener;
  // }, []);
  const [pathname, setPathName] = useState('');
  const [compact, setCompact] = useState(true);
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState({
    title: '工作台',
    breadcrumb: ['工作台', '我的工作台'],
  });
  const RightHeader = () => {
    return (
      <div className="app-right-header">
        <Space>
          <span
            onClick={() => {
              setDark(!dark);
            }}
          >
            切换主题
          </span>
          <span
            onClick={() => {
              setDark(!compact);
            }}
          >
            切换模式
          </span>
          <Avatar size={32} src={'https://v2.ice.work/img/logo.png'} />
          <Dropdown
            placement="bottom"
            overlay={
              <Menu>
                <Menu.Item>退出登录</Menu.Item>
              </Menu>
            }
          >
            测试用户-123
          </Dropdown>
        </Space>
      </div>
    );
  };
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
      pageHeaderProps={breadcrumb}
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
        onClick: ({ key, currentBreadcrumb }) => {
          // location.hash = key // 接入项目的时候，只需要这行代码，改变 hash 即可
          setPathName(key);
          setBreadcrumb(currentBreadcrumb);
        },
      }}
      rightContentRender={RightHeader}
    >
      内容区域
    </AppLayout>
  );
};
```

## API

<API src="../../src/app-layout/index.tsx" hideTitle></API>
