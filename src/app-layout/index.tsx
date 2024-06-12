import LayoutProps from './type';
import { Menu, Space, Watermark } from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import { getBreadcrumbByMenus } from './util';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import Horizontal from './mode/horizontal';
import Vertical from './mode/vertical';
import Inline from './mode/inline';
import './index.less';

export const RenderMenus = (menus = [], collapsed = false) => {
  return menus.map((item) => {
    return item.children ? (
      <Menu.SubMenu
        key={item.path}
        title={
          <Space>
            {item.icon}
            {!collapsed && item.label}
          </Space>
        }
      >
        {RenderMenus(item.children)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.path}>
        <Space>
          {item.icon}
          {!collapsed && item.label}
        </Space>
      </Menu.Item>
    );
  });
};

// 获取openKey
const getOpenKeyByPathName = (path: string): string[] =>
  path
    .split('/')
    .map((item, index, arr) => {
      return arr.slice(0, index + 1).join('/');
    })
    .filter(Boolean);

export default ({
  pathname = '/',
  layout = 'vertical',
  className,
  dark = false,
  collapsed = false,
  onCollapse = () => {},
  menu = {
    items: [],
  },
  waterMarkProps,
  pageHeaderProps = {},
  title = '默认应用标题',
  logo = 'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico',
  rightContentProps = {
    extra: null,
    droplist: null,
    themeColor: '#165dff',
    avatarUrl:
      'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/user-logo.png',
    onThemeColorChange: () => {},
    onDarkChange: () => {},
  },
  footerRender = () => null,
  siderFooterRender = () => null,
  layoutRef = useRef<any>({}),
  children = null,
}: LayoutProps) => {
  const classNames: string[] = ['app-layout', `app-layout-${layout}`];
  const [selectedKey, setSelectedKey] = useState('');
  /** horizontal 模式的一级菜单 */
  const [topKey, setTopKey] = useState('');
  const [openKeys, setOpenKeys] = useState(['']);
  /** 扩展菜单点击 */
  const menuClick = (path: string) => {
    menu.onClick?.({
      path,
      currentBreadcrumb: getBreadcrumbByMenus(
        menu.items,
        path.split('/').filter(Boolean),
      ),
    } as any);
  };
  const subMenuClick = (path: string) => {
    let newOpenKey = [...openKeys];
    if (openKeys.includes(path)) {
      // 收起功能
      newOpenKey = openKeys.filter((i) => i !== path);
    } else {
      newOpenKey = getOpenKeyByPathName(path);
    }
    setOpenKeys(newOpenKey);
  };
  // 监听 hash
  const listenHash = () => {
    const path = location.hash.substring(1);
    const index = location.hash.substring(1).indexOf('?'); // 去除参数
    const pathName = index === -1 ? path : path.substring(0, index);
    const clearPath: string[] = pathName.split('/').filter(Boolean);
    setSelectedKey(`/${clearPath.join('/')}`);
    setOpenKeys(clearPath.slice(0, clearPath.length - 1).map((i) => `/${i}`)); // 自动打开父级菜单
    setTopKey(`/${clearPath[0]}`);
    return getBreadcrumbByMenus(menu.items, clearPath);
  };
  // 监听外部传入的地址
  useEffect(() => {
    const clearPath = pathname.split('/').filter(Boolean);
    setSelectedKey(`/${clearPath.join('/')}`);
    setOpenKeys(getOpenKeyByPathName(pathname)); // 自动打开父级菜单
    setTopKey(`/${clearPath[0]}`);
  }, [pathname]);
  /** 挂载API */
  useEffect(() => {
    Object.assign(layoutRef.current, {
      listenHashChange: (callBack) => {
        const listen = () => {
          callBack?.({
            currentBreadcrumb: listenHash(),
          });
        };
        listen(); // 进来自动执行一次，自动打开hash对应的菜单
        window.addEventListener('hashchange', listen);
        return () => {
          window.removeEventListener('hashchange', listen);
        };
      },
    });
  }, []);
  if (className) {
    classNames.push(className);
  }
  if (collapsed) {
    classNames.push('app-layout-collapsed');
  }
  if (dark) {
    classNames.push('app-layout-dark');
  }
  const IconBtn = collapsed ? IconRight : IconLeft;
  /** 右侧渲染逻辑 */
  const restProps = {
    menu,
    title,
    logo,
    breadcrumb: pageHeaderProps.breadcrumb,
    pageTitle: pageHeaderProps.title,
    extra: pageHeaderProps.extra,
    rightContentProps,
    RenderMenus,
    openKeys,
    menuClick,
    subMenuClick,
    selectedKey,
    collapsed,
    dark,
    siderFooterRender,
    topKey,
    content: children,
    footerRender,
  };
  return (
    <Watermark {...waterMarkProps}>
      <div className={classNames.join(' ')}>
        {layout === 'vertical' ? (
          <Vertical {...restProps} />
        ) : layout === 'horizontal' ? (
          <Horizontal {...restProps} />
        ) : (
          <Inline {...restProps} />
        )}
      </div>
      <IconBtn
        style={{
          left: collapsed ? 36 : 196,
        }}
        onClick={() => {
          onCollapse(!collapsed);
        }}
        className="app-layout-collapse-btn"
      />
    </Watermark>
  );
};
