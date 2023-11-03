/* eslint-disable max-len */
import LayoutProps from './type';
import { Menu, PageHeader } from 'antd';
import { useEffect, useRef, useState } from 'react';
import WaterMark from './watermark';
import Breadcrumb from './breadcrumb';
import { getBreadcrumbByMenus } from './util';
import './index.less';
import { Icon } from '..';

export default ({
  pathname = '/',
  compact = true,
  className,
  dark = false,
  collapsed = false,
  onCollapse = () => {},
  menu = {},
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
  const [selectedKey, setSelectedKey] = useState('');
  /** horizontal 模式的一级菜单 */
  const [topKey, setTopKey] = useState('');
  const [openKeys, setOpenKeys] = useState(['']);
  /** 扩展菜单点击 */
  const menuClick = (info) => {
    menu.onClick?.({
      ...info,
      currentBreadcrumb: getBreadcrumbByMenus(
        menu.items,
        info.key.split('/').filter(Boolean),
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
      title={pageHeaderProps.title || <div />}
      breadcrumbRender={() => {
        if (compact) {
          return <div />;
        }
        return <Breadcrumb breadcrumb={pageHeaderProps.breadcrumb} />;
      }}
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
                  {...menu}
                  onClick={menuClick}
                  inlineIndent={16}
                  mode="inline"
                  selectedKeys={[selectedKey]}
                  openKeys={openKeys}
                  onOpenChange={(v) => {
                    setOpenKeys(v);
                  }}
                  inlineCollapsed={collapsed}
                  theme={dark ? 'dark' : 'light'}
                />
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
                    onClick={() => {
                      onCollapse(!collapsed);
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
              <div className="app-layout-header-logo">
                <a>
                  {logo}
                  <h1>{title}</h1>
                </a>
              </div>
              <div className="app-layout-header-menu">
                <Menu
                  {...menu}
                  onClick={menuClick}
                  // 这里只渲染一级菜单
                  items={menu.items?.map((item: any) => {
                    return {
                      ...item,
                      children: undefined,
                    };
                  })}
                  mode="horizontal"
                  multiple={false}
                  selectedKeys={[topKey]}
                />
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
                    {...menu}
                    onClick={menuClick}
                    items={
                      (menu.items?.find((item) => item?.key === topKey) as any)
                        ?.children
                    }
                    inlineIndent={16}
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys}
                    onOpenChange={(v) => {
                      setOpenKeys(v);
                    }}
                    inlineCollapsed={collapsed}
                    theme={dark ? 'dark' : 'light'}
                  />
                </div>
                <div className="app-layout-body-sider-footer">
                  <Icon
                    type="collapsed"
                    primary
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
      </div>
      {waterMarkProps && <WaterMark {...waterMarkProps} />}
    </>
  );
};
