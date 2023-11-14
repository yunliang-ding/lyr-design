/* eslint-disable max-len */
import LayoutProps from './type';
import { Menu, PageHeader, Space } from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import WaterMark from './watermark';
import Breadcrumb from './breadcrumb';
import { getBreadcrumbByMenus } from './util';
import { Icon } from '..';
import './index.less';

export const RenderMenus = (
  menus = [],
  showIcon = false,
  collapsed = false,
) => {
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
          {showIcon && item.icon}
          {!collapsed && item.label}
        </Space>
      </Menu.Item>
    );
  });
};

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
      src="https://v2.ice.work/img/logo.png"
      style={{
        width: 32,
        height: 32,
      }}
    />
  ),
  rightContentRender = () => null,
  footerRender = () => null,
  layoutRef = useRef<any>({}),
  children = null,
}: LayoutProps) => {
  const classNames: string[] = ['app-layout'];
  const openKeyRef: any = useRef([]); // 临时保存的容器
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
    setOpenKeys(clearPath.slice(0, clearPath.length - 1).map((i) => `/${i}`)); // 自动打开父级菜单
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
  return (
    <>
      <div className={classNames.join(' ')}>
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
                  onClickMenuItem={menuClick}
                  selectedKeys={[selectedKey]}
                  // openKeys={openKeys}
                  collapse={collapsed}
                  theme={dark ? 'dark' : 'light'}
                >
                  {RenderMenus(menu.items, false, collapsed)}
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
                  <Icon
                    type="collapsed"
                    primary
                    hover
                    size={24}
                    onClick={() => {
                      onCollapse(!collapsed);
                      // 保存 openKeys
                      if (!collapsed) {
                        console.log('openKeys', openKeys);
                        openKeyRef.current = openKeys;
                      } else {
                        setOpenKeys(openKeyRef.current);
                        openKeyRef.current = [];
                      }
                    }}
                    style={{
                      display: 'flex',
                      transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: '.3s',
                    }}
                  />
                  <Breadcrumb breadcrumb={pageHeaderProps.breadcrumb} />
                </div>
                {rightContentRender()}
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
                  theme={dark ? 'dark' : 'light'}
                >
                  {RenderMenus(
                    menu.items?.map((item: any) => {
                      return {
                        ...item,
                        children: undefined,
                      };
                    }),
                    false,
                  )}
                </Menu>
              </div>
              <div className="app-layout-header-right">
                {rightContentRender()}
              </div>
            </div>
            <div className="app-layout-body">
              <div className="app-layout-body-sider">
                <div className="app-layout-body-sider-menu">
                  {/* 这里渲染当前一级菜单下面的子菜单 */}
                  <Menu
                    onClickMenuItem={menuClick}
                    selectedKeys={[selectedKey]}
                    collapse={collapsed}
                    theme={dark ? 'dark' : 'light'}
                  >
                    {RenderMenus(
                      (menu.items?.find((item) => item?.key === topKey) as any)
                        ?.children,
                      true,
                      collapsed,
                    )}
                  </Menu>
                </div>
                <div className="app-layout-body-sider-footer">
                  <Icon
                    type="collapsed"
                    primary
                    size={24}
                    onClick={() => {
                      onCollapse(!collapsed);
                    }}
                    style={{
                      display: 'flex',
                      transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: '.3s',
                    }}
                  />
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
        {waterMarkProps && <WaterMark {...waterMarkProps} />}
      </div>
    </>
  );
};
