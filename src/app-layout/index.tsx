import LayoutProps from './type';
import { Menu, PageHeader, Space, Watermark } from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import Breadcrumb from './breadcrumb';
import { getBreadcrumbByMenus } from './util';
import { IconLeft, IconRight } from '@arco-design/web-react/icon';
import RightContentRender from './right-content-render';
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
  compact = true,
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
  logo = (
    <img
      src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/favicon.ico"
      style={{
        width: 32,
        height: 32,
      }}
    />
  ),
  rightContentProps = {
    extra: null,
    droplist: null,
    themeColor: '#165dff',
    avatarUrl:
      'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/assets/user-logo.png',
    onThemeColorChange: () => {},
    onDarkChange: () => {},
    onCompactChange: () => {},
  },
  footerRender = () => null,
  siderFooterRender = () => null,
  layoutRef = useRef<any>({}),
  children = null,
}: LayoutProps) => {
  const classNames: string[] = ['app-layout'];
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
  if (compact) {
    classNames.push('app-layout-compact');
  }
  /** 包裹业务路由 */
  const Children = (
    <PageHeader
      {...pageHeaderProps}
      style={{ background: 'var(--color-bg-2)' }}
      breadcrumb={
        compact ? <div /> : ({ routes: pageHeaderProps.breadcrumb } as any)
      }
    >
      {children}
    </PageHeader>
  );
  const IconBtn = collapsed ? IconRight : IconLeft;
  /** 右侧渲染逻辑 */
  return (
    <Watermark {...waterMarkProps}>
      <div className={classNames.join(' ')}>
        <IconBtn
          style={{
            left: collapsed ? 36 : 196,
          }}
          onClick={() => {
            onCollapse(!collapsed);
          }}
          className="app-layout-collapse-btn"
        />
        {compact ? (
          <>
            <div className="app-layout-left">
              <div className="app-layout-left-logo">
                <a>
                  {logo}
                  <h1 hidden={collapsed}>{title}</h1>
                </a>
              </div>
              <div className="app-layout-left-menu">
                <Menu
                  style={{ width: 208 }}
                  openKeys={openKeys}
                  onClickMenuItem={menuClick}
                  onClickSubMenu={subMenuClick}
                  selectedKeys={[selectedKey]}
                  collapse={collapsed}
                  theme={dark ? 'dark' : 'light'}
                >
                  {RenderMenus(menu.items, collapsed)}
                </Menu>
              </div>
            </div>
            <div className="app-layout-right">
              <div className="app-layout-right-header">
                <div
                  hidden={!compact}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Breadcrumb breadcrumb={pageHeaderProps.breadcrumb} />
                </div>
                <RightContentRender
                  {...{
                    dark,
                    compact,
                    ...rightContentProps,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="app-layout-header">
              <div
                className={
                  compact
                    ? 'app-layout-header-logo app-layout-header-logo-compact'
                    : 'app-layout-header-logo'
                }
              >
                <a>
                  {logo}
                  <h1>{title}</h1>
                </a>
              </div>
              <div className="app-layout-header-menu">
                <Menu
                  mode="horizontal"
                  onClickMenuItem={menuClick}
                  selectedKeys={[topKey]}
                  openKeys={[]}
                  theme={dark ? 'dark' : 'light'}
                >
                  {RenderMenus(
                    menu.items?.map((item: any) => {
                      return {
                        ...item,
                        children: undefined,
                      };
                    }),
                  )}
                </Menu>
              </div>
              <div className="app-layout-header-right">
                <RightContentRender
                  {...{
                    dark,
                    compact,
                    ...rightContentProps,
                  }}
                />
              </div>
            </div>
            <div className="app-layout-body">
              <div className="app-layout-body-sider">
                <div className="app-layout-body-sider-menu">
                  {/* 这里渲染当前一级菜单下面的子菜单 */}
                  <Menu
                    onClickMenuItem={menuClick}
                    onClickSubMenu={subMenuClick}
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys}
                    collapse={collapsed}
                    theme={dark ? 'dark' : 'light'}
                  >
                    {RenderMenus(
                      (menu.items?.find((item) => item?.path === topKey) as any)
                        ?.children,
                      collapsed,
                    )}
                  </Menu>
                </div>
                <div className="app-layout-body-sider-footer">
                  {siderFooterRender(collapsed)}
                </div>
              </div>
            </div>
          </>
        )}
        {/* 公共模块抽离 */}
        <div className="app-layout-right-body">
          <div
            className={
              compact
                ? 'app-layout-right-body-compact-content'
                : 'app-layout-right-body-content'
            }
          >
            {Children}
          </div>
          <div className="app-layout-right-body-footer">{footerRender()}</div>
        </div>
      </div>
    </Watermark>
  );
};
