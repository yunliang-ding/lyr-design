import { Menu } from '@arco-design/web-react';
import Breadcrumb from '../breadcrumb';
import RightContentRender from '../right-content-render';
import './inline.less';

export default ({
  menu,
  title,
  pageTitle,
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
  content,
  breadcrumb,
}: any) => {
  /** 右侧渲染逻辑 */
  return (
    <>
      <div className="app-layout-inline-header">
        <div className="app-layout-inline-header-logo">
          <a>
            {logo}
            <h1>{title}</h1>
          </a>
        </div>
        <div className="app-layout-inline-header-menu">
          <Breadcrumb breadcrumb={breadcrumb} />
        </div>
        <div className="app-layout-inline-header-right">
          <RightContentRender
            {...{
              dark,
              ...rightContentProps,
            }}
          />
        </div>
      </div>
      <div className="app-layout-inline-body">
        <div className="app-layout-inline-body-sider">
          <div className="app-layout-inline-body-sider-menu">
            {/* 这里渲染当前一级菜单下面的子菜单 */}
            <Menu
              onClickMenuItem={menuClick}
              onClickSubMenu={subMenuClick}
              selectedKeys={[selectedKey]}
              openKeys={openKeys}
              collapse={collapsed}
              theme={dark ? 'dark' : 'light'}
            >
              {RenderMenus(menu.items, collapsed)}
            </Menu>
          </div>
          <div className="app-layout-inline-body-sider-footer">
            {siderFooterRender(collapsed)}
          </div>
        </div>
        <div className="app-layout-inline-body-right">
          <div className="app-layout-inline-body-right-title">
            <h3>{pageTitle}</h3>
            <div>{extra}</div>
          </div>
          <div className="app-layout-inline-body-right-content">{content}</div>
          <div className="app-layout-inline-body-right-footer">
            {footerRender()}
          </div>
        </div>
      </div>
    </>
  );
};
