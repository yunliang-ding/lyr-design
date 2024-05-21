## 基本使用

> 中后台应用外层壳子布局解决方法

```tsx | react | #f5f5f5
import { AppLayout, Button } from 'lyr-component';
import { Space, Avatar, Input, Dropdown, Menu } from '@arco-design/web-react';
import { IconUser, IconMoon, IconSun } from '@arco-design/web-react/icon';
import { generate, getRgbStr } from '@arco-design/color';
import menus from '@/components/schema/app-layout/schema.tsx';

export default () => {
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
      title="中后台通用模版"
      menu={{
        items: menus,
        onClick: ({ path, currentBreadcrumb }) => {
          setPathName(path);
          setPageHeaderProps({
            ...currentBreadcrumb,
            extra: <Button type="primary">添加</Button>,
          });
        },
      }}
      footerRender={() => <div>这个是底部的说明</div>}
      siderFooterRender={(collapsed) =>
        collapsed ? null : <div>这个 sider 说明</div>
      }
      rightContentProps={{
        extra: <h4>自定义渲染区域</h4>,
        userName: '测试用户',
        droplist: (
          <Menu>
            <Menu.Item key="logout" onClick={() => console.log('切换用户')}>
              切换用户
            </Menu.Item>
          </Menu>
        ),
        avatarUrl:
          'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/user-logo.png',
        themeColor: '#165dff',
        onThemeColorChange: (newColor) => {
          const newList = generate(newColor, {
            list: true,
            dark,
          });
          newList.forEach((l, index) => {
            const rgbStr = getRgbStr(l);
            document.body.style.setProperty(`--arcoblue-${index + 1}`, rgbStr);
          });
        },
        onDarkChange: (dark) => {
          document.body.setAttribute('arco-theme', dark && 'dark');
          setDark(dark);
        },
        onCompactChange: (compact) => {
          setCompact(compact);
        },
      }}
    >
      内容区域
    </AppLayout>
  );
};
```

> 接入项目的时候，使用 AppLayout 内置的 listenHashChange 可监听 hash

```tsx
useEffect(() => {
  const removeListener = layoutRef.current.listenHashChange(
    ({ currentBreadcrumb }) => {
      /** 设置当前路由的默认面包屑 */
      breadcrumbDispatch.update(currentBreadcrumb);
    },
  );
  return removeListener;
}, []);

menu={{
  items: menus,
  onClick: ({ path, currentBreadcrumb }) => {
    location.hash = path // 接入项目的时候，只需要这行代码，改变 hash 即可
  },
}}
```
