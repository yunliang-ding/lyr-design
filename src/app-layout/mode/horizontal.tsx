import { Menu } from '@arco-design/web-react';
import Breadcrumb from '../breadcrumb';
import RightContentRender from '../right-content-render';
import './horizontal.less';

export default ({
  menu,
  title,
  logo,
  extra,
  rightContentProps,
  RenderMenus,
  openKeys,
  menuClick,
  subMenuClick,
  selectedKey,
  collapsed,
  dark,
  footerRender,
  siderFooterRender,
  topKey,
  content,
  breadcrumb,
}: any) => {
  /** 右侧渲染逻辑 */
  return (
    <>
      <div className="app-layout-horizontal-header">
        <div className="app-layout-horizontal-header-logo">
          <a>
            <img
              src={logo}
              style={{
                width: 32,
                height: 32,
              }}
            />
            <h1>{title}</h1>
          </a>
        </div>
        <div className="app-layout-horizontal-header-menu">
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
        <div className="app-layout-horizontal-header-right">
          <RightContentRender
            {...{
              dark,
              ...rightContentProps,
            }}
          />
        </div>
      </div>
      <div className="app-layout-horizontal-body">
        <div className="app-layout-horizontal-body-sider">
          <div className="app-layout-horizontal-body-sider-menu">
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
          <div className="app-layout-horizontal-body-sider-footer">
            {siderFooterRender(collapsed)}
          </div>
        </div>
        <div className="app-layout-horizontal-body-right">
          <div className="app-layout-horizontal-body-right-breadcrumb">
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="app-layout-vertical-right-body-title-extra">
              {extra}
            </div>
          </div>
          <div className="app-layout-horizontal-body-right-content">
            {content}
          </div>
          <div className="app-layout-horizontal-body-right-footer">
            {footerRender()}
          </div>
        </div>
      </div>
    </>
  );
};
